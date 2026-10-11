import log from './Console.log.astro'
import info from './Console.info.astro'
import warn from './Console.warn.astro'
import debug from './Console.debug.astro'
import error from './Console.error.astro'
import table from './Console.table.astro'

type ConsoleMethods = {
  log: typeof log
  info: typeof info
  warn: typeof warn
  debug: typeof debug
  error: typeof error
  table: typeof table
}

export const Console = {
  log,
  info,
  warn,
  debug,
  error,
  table,
} satisfies ConsoleMethods