import van from "https://cdn.jsdelivr.net/npm/vanjs-core@1.5.3/src/van.js"
import { tags } from 'ziko/dom'
import { useDerived, useState, useEffect } from 'ziko/hooks'

const {
  div, 
  span, 
  tr, 
  th, 
  td
} = van.tags
const {
  // div, 
  // span, 
  table, 
  thead, 
  tbody, 
  // tr, 
  // th, 
  // td
} = tags
/*  Helpers & Formatters */

const isObj = v => v !== null && typeof v === "object"
const cname = v => { try { return Object.getPrototypeOf(v)?.constructor?.name || "" } catch { return "" } }
const prim = v => typeof v === "string" ? JSON.stringify(v) : typeof v === "bigint" ? v + "n" : String(v)
const primCls = v => v == null ? "nul" : typeof v === "string" ? "str" : typeof v === "boolean" ? "bool" : "num"

const label = v =>
  Array.isArray(v) ? `Array(${v.length})` :
  v instanceof Map ? `Map(${v.size})` :
  v instanceof Set ? `Set(${v.size})` :
  ((n => n && n !== "Object" ? n : "")(cname(v)))

const short = v =>
  typeof v === "function" ? `ƒ ${v.name || ""}()` :
  !isObj(v) ? prim(v) :
  v instanceof Date ? v.toISOString() :
  v instanceof RegExp ? String(v) :
  Array.isArray(v) ? label(v) : (label(v) || "Object") + " {…}"

const entriesOf = v => {
  try {
    return Array.isArray(v) ? v.map((x, i) => [i, x])
      : v instanceof Map ? [...v].map(([a, b]) => [short(a), b])
      : v instanceof Set ? [...v].map((x, i) => [i, x])
      : Object.keys(v).map(k => [k, v[k]])
  } catch { return [] }
}

const preview = v => {
  const es = entriesOf(v), list = Array.isArray(v) || v instanceof Set
  const body = es.slice(0, 5).map(([k, x]) => (list ? "" : k + ": ") + short(x)).join(", ") + (es.length > 5 ? ", …" : "")
  const l = label(v)
  return (l ? l + " " : "") + (list ? `[${body}]` : `{${body}}`)
}
/* Components */ 

const Inspect = (v, key, seen = [], top = false) => {
  const k = key === undefined ? "" : span({class: "cf-k"}, key, ": ")
  const leaf = (cls, t) => span({class: "cf-" + cls}, k, t)

  if (v instanceof Error) {
    const s = v.stack?.includes(v.message) ? v.stack : `${v.name}: ${v.message}\n${v.stack || ""}`
    return tags.div({class: "cf-err"}, k, s)
  }
  if (top && typeof v === "string") return span(v)
  if (typeof v === "function") return leaf("fn", short(v))
  if (!isObj(v)) return leaf(primCls(v), prim(v))
  if (v instanceof Date || v instanceof RegExp) return leaf("str", short(v))
  if (seen.includes(v)) return leaf("nul", "[Circular]")

  const es = entriesOf(v)
  if (!es.length) return leaf("nul", (label(v) ? label(v) + " " : "") + (Array.isArray(v) ? "[]" : "{}"))

  const open = van.state(false)
  const [_open, setOpen] = useState(false)
  const derived_class = useDerived(open => open ? "cf-t open" : "cf-t", [_open])
  useEffect(e => console.log(e), [derived_class])
  const chain = [...seen, v]
  globalThis.dd = tags.div({class : derived_class}).setAttr({ id : derived_class})
  globalThis.setOpen = setOpen
  return div({class: "cf-node"},
    div({class: () => "cf-t" + (open.val ? " open" : ""), onclick: () => open.val = !open.val},
      k, () => open.val ? (label(v) || "Object") : preview(v)),
    () => open.val ? div({class: "cf-kids"}, es.map(([kk, x]) => Inspect(x, kk, chain))) : "")
}

const Table = data => {
  const rows = Array.isArray(data) ? data.map((x, i) => [i, x])
    : data instanceof Map ? [...data].map(([a, b]) => [short(a), b])
    : Object.entries(data)
  const cols = [...new Set(rows.flatMap(([, x]) => isObj(x) ? Object.keys(x) : []))]
  const hasVal = rows.some(([, x]) => !isObj(x))
  return table({class: "cf-table"},
    thead(tr(th("(index)"), cols.map(c => th(c)), hasVal ? th("Value") : "")),
    tbody(...rows.map(([i, x]) => tr(
      td(i),
      cols.map(c => td(isObj(x) && c in x ? short(x[c]) : "")),
      hasVal ? td(isObj(x) ? "" : prim(x)) : ""))))
}

const Row = (method, args) => {
  const [a0, ...rest] = args
  const items = method === "table" && isObj(a0)
    ? [Table(a0), ...rest.map(x => Inspect(x, undefined, [], true))]
    : args.map(a => Inspect(a, undefined, [], true))

  return tags.div({class: `cf-row ${method}`},
    tags.span({class: "cf-time"}, new Date().toLocaleTimeString([], {hour12: false})),
    tags.div({class: "cf-msg"}, ...items))
}

export const Console = Object.fromEntries(
  ["log", "info", "debug", "warn", "error", "table", "dir"].map(method => [
    method,
    (...args) => tags.div(
      {class: "cf"}, 
      tags.div({class: "cf-body"}, 
      Row(method === "dir" ? "log" : method, args))
    )
  ])
)
