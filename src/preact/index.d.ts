import { ComponentType, JSX } from 'preact';

export declare function domify<P = {}>(
  Component: ComponentType<P> | JSX.Element,
  props?: P
): HTMLElement | null;

export declare function zikofy<P = {}>(
  Component: ComponentType<P> | JSX.Element,
  props?: P
): UIElement;

