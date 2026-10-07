import { tags } from 'ziko/dom'

const { div } = tags;

import { isProps } from "../utils/index.js";
import { Hook } from "../hook/index.js";
import { createFeed } from "../feed/index.js";
import { nodeEntry } from "./nodeEntry.js";
import { cache } from "./Row.js";
import { ConsoleToolbar } from "./ConsoleToolbar.js";
import { ConsoleBody } from "./ConsoleBody.js";
import { ConsolePrompt } from "./ConsolePrompt.js";

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

  const bar = ConsoleToolbar(feed);
  const body = ConsoleBody(feed);
  const prompt = repl ? ConsolePrompt(feed) : "";

  const container = div(
    { class: "cf " + feed.theme },
    bar,
    body,
    prompt,
  ).style({
    flex : 1
  });

  feed.addEventListener("theme-change", (e) => {
    container.className = "cf " + e.detail + " flex:1";
  });

  return container;
}