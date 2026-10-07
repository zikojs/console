import { tags } from "ziko/dom";
const { div } = tags;
import { Row, cache } from "./Row.js";

export function ConsoleBody(feed) {
  const listContainer = div();

  const renderLogs = () => {
    const visible = feed.getVisibleLogs();
    listContainer.element.replaceChildren(
      (
        visible.length
        ? div(...visible.map((e) => Row(e)))
        : div(
            { class: "cf-empty" },
            "No messages yet. Anything sent to console.* shows up here.",
          )
      ).element

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
  ).element;

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

  return body;
}