export const isObj = (value) => value !== null && typeof value === "object";

export const cname = (value) => {
  try {
    return Object.getPrototypeOf(value)?.constructor?.name || "";
  } catch {
    return "";
  }
};

export const prim = (value) =>
  typeof value === "string"
    ? JSON.stringify(value)
    : typeof value === "bigint"
      ? value + "n"
      : String(value);

export const primCls = (value) =>
  value == null
    ? "nul"
    : typeof value === "string"
      ? "str"
      : typeof value === "boolean"
        ? "bool"
        : "num";

export const label = (value) =>
  Array.isArray(value)
    ? `Array(${value.length})`
    : value instanceof Map
      ? `Map(${value.size})`
      : value instanceof Set
        ? `Set(${value.size})`
        : ((constructorName) => (constructorName && constructorName !== "Object" ? constructorName : ""))(cname(value));

export const short = (value) =>
  typeof value === "function"
    ? `ƒ ${value.name || ""}()`
    : !isObj(value)
      ? prim(value)
      : value instanceof Date
        ? value.toISOString()
        : value instanceof RegExp
          ? String(value)
          : Array.isArray(value)
            ? label(value)
            : (label(value) || "Object") + " {…}";

export const entriesOf = (value) => {
  try {
    return Array.isArray(value)
      ? value.map((item, index) => [index, item])
      : value instanceof Map
        ? [...value].map(([mapKey, mapValue]) => [short(mapKey), mapValue])
        : value instanceof Set
          ? [...value].map((item, index) => [index, item])
          : Object.keys(value).map((key) => [key, value[key]]);
  } catch {
    return [];
  }
};

export const preview = (value) => {
  const entries = entriesOf(value);
  const isListLike = Array.isArray(value) || value instanceof Set;
  
  const previewBody =
    entries
      .slice(0, 5)
      .map(([key, item]) => (isListLike ? "" : key + ": ") + short(item))
      .join(", ") + (entries.length > 5 ? ", …" : "");
      
  const typeLabel = label(value);
  return (typeLabel ? typeLabel + " " : "") + (isListLike ? `[${previewBody}]` : `{${previewBody}}`);
};