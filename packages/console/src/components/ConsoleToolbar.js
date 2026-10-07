import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.3/src/van.js";
const { div, span, input, button } = van.tags;
import { LEVELS } from "../utils/index.js";

export function ConsoleToolbar(feed) {
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

  return div(
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
}