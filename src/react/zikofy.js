import { UIElement } from "ziko/ui";
import { domify } from "./domify.js"

export const zikofy = (Component, props = {}) => {
  const el = domify(Component, props)
  return new UIElement({ element : el})
};
