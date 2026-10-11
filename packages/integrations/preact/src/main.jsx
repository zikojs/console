import { ZikoWrapper } from '@zikojs/preact'
import { Console as _Console } from '@zikojs/console/no-css'

const ZikoConsole = ({ methode = 'log', children = [] } = {}) =>
    _Console[methode](children)

const PreactConsole = ({
  methode = 'log',
  children = []
} = {}) => (
  <ZikoWrapper>
    <ZikoConsole methode={methode} children={children} />
  </ZikoWrapper>
)

export const Console = Object.fromEntries(
  ['log', 'info', 'warn', 'debug', 'error', 'table'].map(
    methode => [
      methode,
      ({ children }) => (
        <PreactConsole methode={methode}>
          {children}
        </PreactConsole>
      )
    ]
  )
)