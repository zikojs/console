import { LEVEL, LEVELS, same, fmt, safe } from "../utils/index.js";

export class ConsoleStore extends EventTarget {
  constructor(max = 1000, cacheRef = null) {
    super();
    this.logs = [];
    this.max = max;
    this.depth = 0;
    this.id = 0;
    this.levels = Object.fromEntries(LEVELS.map((l) => [l, true]));
    this.query = "";
    this.cache = cacheRef;
  }

  toggleLevel(level) {
    this.levels[level] = !this.levels[level];
    this.dispatchEvent(new CustomEvent("filter-change"));
  }

  setQuery(query) {
    this.query = query;
    this.dispatchEvent(new CustomEvent("filter-change"));
  }

  push(src) {
    const { method, args = [] } = src;
    if (method === "clear") {
      this.depth = 0;
      this.logs = [];
      this.dispatchEvent(new CustomEvent("clear"));
      this.dispatchEvent(new CustomEvent("logs-change"));
      return;
    }
    if (method === "groupEnd") {
      this.depth = Math.max(0, this.depth - 1);
      return;
    }
    const isGroup = method === "group" || method === "groupCollapsed";
    const e = src.count
      ? Object.assign(src, { id: ++this.id, depth: this.depth })
      : {
          id: ++this.id,
          method: isGroup ? "group" : method,
          args,
          depth: this.depth,
          count: 1,
          time: new Date(),
        };

    if (src.count && this.cache) {
      this.cache.get(e)?.style.setProperty("--d", this.depth);
    }

    const last = this.logs.at(-1);
    if (last && !isGroup && same(last, e)) {
      last.count++;
      this.dispatchEvent(new CustomEvent("row-update", { detail: last }));
      return;
    }

    this.logs.push(e);
    if (this.logs.length > this.max) {
      this.logs.shift();
    }

    this.dispatchEvent(new CustomEvent("logs-change", { detail: e }));
    if (isGroup) this.depth++;
  }

  clear() {
    this.push({ method: "clear" });
  }

  getCount(level) {
    return this.logs.filter((e) => LEVEL[e.method] === level).length;
  }

  getVisibleLogs() {
    const s = this.query.toLowerCase();
    return this.logs.filter(
      (e) =>
        (!(e.method in LEVEL) || this.levels[LEVEL[e.method]]) &&
        (!s || fmt(e.args).map(safe).join(" ").toLowerCase().includes(s))
    );
  }
}

export function createFeed(max = 1000, cache) {
  return new ConsoleStore(max, cache);
}