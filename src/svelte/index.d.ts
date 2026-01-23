import { JSX } from "solid-js";
import { UIElement } from "ziko/ui";

export declare function domify<P = {}>(
  Component: ((props: P) => JSX.Element) | JSX.Element,
  props?: P
): HTMLElement | null;

export declare function zikofy<P = {}>(
  Component: ((props: P) => JSX.Element) | JSX.Element,
  props?: P
): UIElement;
