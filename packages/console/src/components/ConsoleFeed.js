import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.3/src/van.js";
const { div, span, input, button } = van.tags;

import { fmt, isObj, isProps, LEVELS } from "../utils/index.js";
import { Hook } from "../hook/index.js";
import { Inspect } from "./Inspect.js";
import { Table } from "./Table.js";
import { createFeed } from "../feed/index.js";

const cache = new WeakMap();

const buildRow = (e) => {
  const [a0, ...rest] = e.args;
  const items =
    e.method === "table" && isObj(a0)
      ? [Table(a0), rest.map((x) => Inspect(x, undefined, [], true)).element]
      : fmt(e.args).map((a) => Inspect(a, undefined, [], true).element);

  const badgeSpan = span({ class: "cf-badge" }, () => (e.count > 1 ? e.count : ""));
  const updateBadge = () => {
    badgeSpan.textContent = e.count > 1 ? e.count : "";
    badgeSpan.style.display = e.count > 1 ? "inline-block" : "none";
  };
  badgeSpan.updateBadge = updateBadge;
  updateBadge();

  return div(
    { class: `cf-row ${e.method}`, style: `--d:${e.depth}` },
    badgeSpan,
    span(
      { class: "cf-time" },
      e.time.toLocaleTimeString([], { hour12: false }),
    ),
    div({ class: "cf-msg" }, items),
  );
};

const Row = (e) => {
  if (cache.has(e)) return cache.get(e);
  const n = buildRow(e);
  cache.set(e, n);
  return n;
};

const nodeEntry = new WeakMap();

const makeEntry = (method, args) => ({
  id: 0,
  method,
  args,
  depth: 0,
  count: 1,
  time: new Date(),
});

const entryNode =
  (method) =>
  (...args) => {
    const e = makeEntry(method, args);
    const node = div(
      { class: () => "cf cf-solo " + Console.theme.val },
      Row(e),
    );
    nodeEntry.set(node, e);
    return node;
  };

export const Console = {
  theme: { val: "dark" },
  log: entryNode("log"),
  info: entryNode("info"),
  debug: entryNode("debug"),
  warn: entryNode("warn"),
  error: entryNode("error"),
  table: entryNode("table"),
  group: entryNode("group"),
  groupEnd: () => {
    const node = document.createComment("groupEnd");
    nodeEntry.set(node, { method: "groupEnd", args: [] });
    return node;
  },
};

export function ConsoleFeed(...args) {
  const [props, ...kids] = isProps(args[0]) ? args : [{}, ...args];
  const feed = props.feed || createFeed(1000, cache);
  const {
    variant = "dark",
    repl = true,
    hook = false,
  } = props;

  if (hook) Hook(console, (e) => feed.push(e));
  kids.flat(Infinity).forEach((c) => {
    const e = nodeEntry.get(c);
    if (e) feed.push(e);
  });

  const initialTheme = typeof variant === "string" ? variant : (variant.val || "dark");
  feed.setTheme(initialTheme);

  const listContainer = div();

  const renderLogs = () => {
    const visible = feed.getVisibleLogs();
    listContainer.replaceChildren(
      visible.length
        ? div(visible.map((e) => Row(e)))
        : div(
            { class: "cf-empty" },
            "No messages yet. Anything sent to console.* shows up here.",
          )
    );
  };

  let stick = true;
  const body = div(
    {
      class: "cf-body",
      onscroll: () => {
        stick = body.scrollHeight - body.scrollTop - body.clientHeight < 24;
      },
    },
    listContainer
  );

  feed.addEventListener("logs-change", () => {
    renderLogs();
    if (stick) {
      requestAnimationFrame(() => {
        body.scrollTop = body.scrollHeight;
      });
    }
  });

  feed.addEventListener("clear", () => {
    renderLogs();
  });

  feed.addEventListener("row-update", (e) => {
    const rowEl = cache.get(e.detail);
    if (rowEl) {
      const badge = rowEl.querySelector(".cf-badge");
      if (badge && badge.updateBadge) badge.updateBadge();
    }
  });

  renderLogs();

  const chipButtons = {};
  const countSpans = {};

  const updateToolbar = () => {
    LEVELS.forEach((l) => {
      if (chipButtons[l]) {
        const isOn = feed.levels[l];
        chipButtons[l].className = `cf-chip ${l}` + (isOn ? " on" : "");
        chipButtons[l].setAttribute("aria-pressed", isOn);
      }
      if (countSpans[l]) {
        countSpans[l].textContent = feed.getCount(l);
      }
    });
  };

  feed.addEventListener("filter-change", updateToolbar);

  const bar = div(
    { class: "cf-bar" },
    LEVELS.map((l) => {
      countSpans[l] = span(feed.getCount(l));
      chipButtons[l] = button(
        {
          class: `cf-chip ${l}` + (feed.levels[l] ? " on" : ""),
          "aria-pressed": feed.levels[l],
          onclick: () => feed.toggleLevel(l),
        },
        l,
        " ",
        countSpans[l],
      );
      return chipButtons[l];
    }),
    input({
      type: "search",
      placeholder: "Filter messages",
      "aria-label": "Filter messages",
      oninput: (e) => feed.setQuery(e.target.value),
    }),
    button({ onclick: () => feed.clear() }, "Clear"),
  );

  const hist = [];
  let hi = 0;
  const run = (code) => {
    feed.push({ method: "command", args: [code] });
    try {
      feed.push({ method: "result", args: [(0, eval)(code)] });
    } catch (err) {
      feed.push({ method: "error", args: [err] });
    }
  };

  const prompt =
    repl &&
    div(
      { class: "cf-prompt" },
      span("\u203A"),
      input({
        placeholder: "Run JavaScript",
        "aria-label": "Run JavaScript",
        spellcheck: false,
        autocomplete: "off",
        onkeydown: (e) => {
          const el = e.target;
          if (e.key === "Enter" && el.value.trim()) {
            hist.push(el.value);
            hi = hist.length;
            run(el.value);
            el.value = "";
          } else if (e.key === "ArrowUp" && hi > 0) {
            el.value = hist[--hi];
            e.preventDefault();
          } else if (e.key === "ArrowDown") {
            el.value =
              hi < hist.length - 1 ? hist[++hi] : ((hi = hist.length), "");
          }
        },
      }),
    );

  const container = div(
    { class: () => "cf " + feed.theme, style: "flex:1" },
    bar,
    body,
    prompt || "",
  );

  feed.addEventListener("theme-change", (e) => {
    container.className = "cf " + e.detail + " flex:1";
  });

  return container;
}