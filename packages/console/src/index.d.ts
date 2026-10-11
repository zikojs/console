/// <reference types="ziko" />

import type { UIElement } from "ziko/dom";

/**
 * Developer console components for Ziko.js
 * 
 * @example
 * ```typescript
 * import { Console } from "@zikojs/console";
 * import { tags } from "ziko/dom";
 * 
 * const { div } = tags;
 * 
 * // Render standalone logging and table components directly into the DOM
 * const log = Console.log("Hello, Ziko.js!", { active: true });
 * const table = Console.table([{ id: 1, name: "Ziko" }]);
 * 
 * div(log, table).mount(document.body);
 * ```
 */
export declare const Console: {
  /** Renders a standard log line component */
  log(...args: unknown[]): UIElement;
  
  /** Renders an informational message component */
  info(...args: unknown[]): UIElement;
  
  /** Renders a debug message component */
  debug(...args: unknown[]): UIElement;
  
  /** Renders a warning callout component */
  warn(...args: unknown[]): UIElement;
  
  /** Renders an error message or stack trace component */
  error(...args: unknown[]): UIElement;
  
  /** Renders a structured tabular data component */
  table(data: unknown, ...args: unknown[]): UIElement;
  
  /** Renders an interactive directory inspection component */
  dir(...args: unknown[]): UIElement;
};