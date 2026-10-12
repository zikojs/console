import { tags } from "ziko/dom";
import { useDerived, useState, useEffect } from "ziko/hooks";
import {
  isObj,
  prim,
  primCls,
  label,
  short,
  entriesOf,
  preview
} from './utils/index.js';

const {
  div,
  span,
  table,
  thead,
  tbody,
  tr,
  th,
  td
} = tags;

const Inspect = (value, propertyKey, seenObjects = [], isTopLevel = false) => {
  const propertyLabel = propertyKey === undefined ? "" : span({ class: "cf-k" }, propertyKey, ": ");
  const createLeafNode = (cssClass, textContent) => span({ class: "cf-" + cssClass }, propertyLabel, textContent);

  if (value instanceof Error) {
    const stackTrace = value.stack?.includes(value.message)
      ? value.stack
      : `${value.name}: ${value.message}\n${value.stack || ""}`;
    return div({ class: "cf-err" }, propertyLabel, stackTrace);
  }
  
  if (isTopLevel && typeof value === "string") return span(value);
  if (typeof value === "function") return createLeafNode("fn", short(value));
  if (!isObj(value)) return createLeafNode(primCls(value), prim(value));
  if (value instanceof Date || value instanceof RegExp) return createLeafNode("str", short(value));
  if (seenObjects.includes(value)) return createLeafNode("nul", "[Circular]");

  const objectEntries = entriesOf(value);
  if (!objectEntries.length)
    return createLeafNode(
      "nul",
      (label(value) ? label(value) + " " : "") + (Array.isArray(value) ? "[]" : "{}"),
    );

  const [isOpen, setIsOpen] = useState(false);
  const updatedSeenChain = [...seenObjects, value];
  const nodeContainer = div({ class: "cf-t" }, propertyLabel);

  useEffect(
    ([isOpenState]) => {
      isOpenState
        ? nodeContainer.element.classList.add("open")
        : nodeContainer.element.classList.remove("open");
    },
    [isOpen],
  );

  nodeContainer.onClick(() => setIsOpen((oldState) => !oldState));

  const previewElement = useDerived(
    (isOpenState) => {
      if (isOpenState) return label(value) || "Object";
      return preview(value);
    },
    [isOpen],
  );

  const childrenContainer = useDerived(
    (isOpenState) => {
      if (isOpenState)
        return div(
          { class: "cf-kids" },
          ...objectEntries.map(([nestedKey, nestedValue]) => Inspect(nestedValue, nestedKey, updatedSeenChain)),
        );
      return "";
    },
    [isOpen],
  );

  nodeContainer.append(previewElement, childrenContainer);
  return nodeContainer;
};

const Table = (tableData) => {
  const tableRows = Array.isArray(tableData)
    ? tableData.map((item, index) => [index, item])
    : tableData instanceof Map
      ? [...tableData].map(([mapKey, mapValue]) => [short(mapKey), mapValue])
      : Object.entries(tableData);

  const tableColumns = [
    ...new Set(tableRows.flatMap(([, rowItem]) => (isObj(rowItem) ? Object.keys(rowItem) : []))),
  ];

  const hasPrimitiveValues = tableRows.some(([, rowItem]) => !isObj(rowItem));

  return div(
  { class: "cf-table-wrapper" },
  table(
    { class: "cf-table" },
    thead(
      tr(
        th("(index)"),
        ...tableColumns.map((columnName) => th(columnName)),
        hasPrimitiveValues ? th("Value") : "",
      ),
    ),
    tbody(
      ...tableRows.map(([rowIndex, rowItem]) =>
        tr(
          td(rowIndex),
          ...tableColumns.map((columnName) =>
            td(
              isObj(rowItem) && columnName in rowItem
                ? short(rowItem[columnName])
                : "",
            ),
          ),
          hasPrimitiveValues
            ? td(isObj(rowItem) ? "" : prim(rowItem))
            : "",
        ),
      ),
    ),
  ),
);
};

const Row = (method, args) => {
  const [firstArg, ...remainingArgs] = args;
  const items =
    method === "table" && isObj(firstArg)
      ? [Table(firstArg), ...remainingArgs.map((arg) => Inspect(arg, undefined, [], true))]
      : args.map((arg) => Inspect(arg, undefined, [], true));

  return div(
    { class: `cf-row ${method}` },
    tags.span(
      { class: "cf-time" },
      new Date().toLocaleTimeString([], { hour12: false }),
    ),
    div({ class: "cf-msg" }, ...items),
  );
};

export const Console = Object.fromEntries(
  ["log", "info", "debug", "warn", "error", "table", "dir"].map((method) => [
    method,
    (...args) =>
      div(
        { class: "console-feed", 'data-engine' : 'zikojs' },
        div({ class: "cf-body" }, Row(method === "dir" ? "log" : method, args)),
      ).setAttr({'data-engine' : 'zikojs'}),
  ]),
);