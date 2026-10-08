import { tags } from 'ziko/dom'

const { div } = tags;

import { isProps } from "../utils/index.js";
import { Hook } from "../hook/index.js";
import { createFeed } from "../feed/index.js";
import { nodeEntry } from "./nodeEntry.js";
import { cache } from "./Row.js";
import { ConsoleBody } from "./ConsoleBody.js";

export function ConsoleFeed(...args) {
  const [props, ...kids] = isProps(args[0]) ? args : [{}, ...args];
  const feed = props.feed || createFeed(1000, cache);
  const { hook = false } = props;

  if (hook) Hook(console, (e) => feed.push(e));
  kids.flat(Infinity).forEach((c) => {
    const e = nodeEntry.get(c);
    if (e) feed.push(e);
  });

  const body = ConsoleBody(feed);

  const container = div(
    { class: "cf" },
    // bar,
    body,
    // prompt,
  ).style({
    flex : 1
  });

  return container;
}