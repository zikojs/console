import { ComponentType, JSX } from 'preact';

export declare function domify<P = {}>(
  Component: ComponentType<P> | JSX.Element,
  props?: P
): HTMLElement | HTMLElement[];

export declare function zikofy<P = {}>(
  Component: ComponentType<P> | JSX.Element,
  props?: P
): UIElement | UIElement[];

