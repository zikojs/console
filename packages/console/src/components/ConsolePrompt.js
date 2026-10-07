import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.3/src/van.js";
const { div, span, input } = van.tags;

export function ConsolePrompt(feed) {
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

  return div(
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
}