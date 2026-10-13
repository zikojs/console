
import type { Component } from 'svelte'

import ConsoleLog from './Console.log.svelte'
import ConsoleInfo from './Console.info.svelte'
import ConsoleWarn from './Console.warn.svelte'
import ConsoleDebug from './Console.debug.svelte'
import ConsoleError from './Console.error.svelte'
import ConsoleTable from './Console.table.svelte'

export const Console = {
  log: ConsoleLog,
  info: ConsoleInfo,
  warn: ConsoleWarn,
  debug: ConsoleDebug,
  error: ConsoleError,
  table: ConsoleTable,
} satisfies Record<string, Component<{ items?: unknown }>>