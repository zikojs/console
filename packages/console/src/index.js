import "./index.css";
import { Hook } from "./hook/index.js";
import { createFeed } from "./feed/index.js";
import { ConsoleFeed, Console } from "./components/index.js";

Object.assign(window, {
  ConsoleFeed: { Hook, createFeed, ConsoleFeed, Console },
});

/* =====================================================================
   Demo
   ===================================================================== */

Console.theme = 'light';

// 1) Declarative
document.body.append(
  document.createComment('Declarative')
)
document.body.append(
  ConsoleFeed(
    { variant: 'light', repl: false },
    Console.log("Hello from VanJS", 42, true, null, undefined),
    Console.info("Server listening on :3000"),
    Console.group("Request"),
    Console.log("parsing"),
    Console.warn("token expires soon"),
    Console.groupEnd(),
    Console.error(new Error("Something broke")),
    Console.table([
      { id: 1, name: "Ada" },
      { id: 2, name: "Linus" },
    ]),
  ),
);

// 2) Standalone
document.body.append(
  document.createComment('Standalone')
)
document.body.append(Console.log("Just one line", { a: 1, b: 1 }));
document.body.append(Console.warn("Standalone warning"));
document.body.append(Console.table([1, 2, 3]));

// 3) Live
document.body.append(
  document.createComment('Live')
)
const feed = createFeed();
Hook(console, (e) => feed.push(e));
globalThis.c = ConsoleFeed({ feed, variant: 'light' });
document.body.append(c);

console.log("Hello from VanJS", 42, true, null, undefined);