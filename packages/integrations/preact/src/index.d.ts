import type { JSX } from "preact";

/**
 * Console components for Preact applications.
 * 
 * @example
 * ```tsx
 * import { Console } from "@zikojs/preact-console";
 * 
 * export default function App() {
 *   return (
 *     <div>
 *       <Console.log>Hello from Preact and Ziko.js!</Console.log>
 *       <Console.table>{[{ id: 1, name: "Ziko" }]}</Console.table>
 *     </div>
 *   );
 * }
 * ```
 */
export declare const Console: {
  /** Renders a standard log line */
  log: (props: { children?: unknown }) => JSX.Element;
  
  /** Renders an informational message */
  info: (props: { children?: unknown }) => JSX.Element;
  
  /** Renders a warning callout */
  warn: (props: { children?: unknown }) => JSX.Element;
  
  /** Renders a debug message */
  debug: (props: { children?: unknown }) => JSX.Element;
  
  /** Renders an error message or stack trace */
  error: (props: { children?: unknown }) => JSX.Element;
  
  /** Renders structured tabular data */
  table: (props: { children?: unknown }) => JSX.Element;
};