import { ZikoWrapper } from '@zikojs/preact'
import { Console as _Console } from '@zikojs/console'
import { tags } from 'ziko/dom'

const { div } = tags

const ZikoConsole = ({ methode = 'log', children = [] } = {}) =>
  div(
    _Console[methode](children)
  )

const PreactConsole = ({
  methode = 'log',
  children = []
} = {}) => (
  <ZikoWrapper>
    <ZikoConsole methode={methode} children={children} />
  </ZikoWrapper>
)

export const Console = {
  log: ({ children }) => (
    <PreactConsole methode="log">
      {children}
    </PreactConsole>
  ),
  info: ({ children }) => (
    <PreactConsole methode="info">
      {children}
    </PreactConsole>
  ),
  warn: ({ children }) => (
    <PreactConsole methode="warn">
      {children}
    </PreactConsole>
  ),
  debug: ({ children }) => (
    <PreactConsole methode="debug">
      {children}
    </PreactConsole>
  ),
  error: ({ children }) => (
    <PreactConsole methode="error">
      {children}
    </PreactConsole>
  ),
  table: ({ children }) => (
    <PreactConsole methode="table">
      {children}
    </PreactConsole>
  )
}