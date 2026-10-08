import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.3/src/van.js";
const { div } = van.tags;
import { nodeEntry, makeEntry } from "./nodeEntry.js";
import { Row } from "./Row.js";

const entryNode =
  (method) =>
  (...args) => {
    const e = makeEntry(method, args);
    const node = div(
      { class: () => "cf cf-solo " + Console.theme }, // <-- using a function or string
      Row(e),
    );
    nodeEntry.set(node, e);
    return node;
  };

export const Console = {
  theme: "auto",
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