import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.3/src/van.js";

const { div, span } = van.tags;

import { fmt, isObj } from "../utils/index.js";
import { Inspect, Table } from "./index.js";

const cache = new WeakMap();

const buildRow = (e) => {
  const [a0, ...rest] = e.args;

  const items =
    e.method === "table" && isObj(a0)
      ? [
          Table(a0),
          rest.map((x) => Inspect(x, undefined, [], true)).element,
        ]
      : fmt(e.args).map((a) =>
          Inspect(a, undefined, [], true).element,
        );

  // Reactive state
  const count = van.state(e.count);

  const badgeSpan = span(
    {
      class: "cf-badge",
      style: () =>
        `display: ${count.val > 1 ? "inline-block" : "none"}`,
    },
    () => (count.val > 1 ? count.val : ""),
  );

  // Keep the state synchronized with the console entry.
  const updateBadge = () => {
    count.val = e.count;
  };

  badgeSpan.updateBadge = updateBadge;

  return div(
    {
      class: `cf-row ${e.method}`,
      style: `--d:${e.depth}`,
    },
    badgeSpan,
    span(
      { class: "cf-time" },
      e.time.toLocaleTimeString([], { hour12: false }),
    ),
    div(
      { class: "cf-msg" },
      items,
    ),
  );
};

export const Row = (e) => {
  if (cache.has(e)) return cache.get(e);

  const node = buildRow(e);

  cache.set(e, node);

  return node;
};

export { cache };