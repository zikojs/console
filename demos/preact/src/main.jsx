import { render } from 'preact'

import { Console } from '@zikojs/preact-console'


render(
<>
<Console.log>
    {['Item 1', 'Item 2']}
</Console.log>
<Console.table>
    {['Item 1', 'Item 2']}
</Console.table>
<Console.warn>
    {{window}}
</Console.warn>
</>,
  document.getElementById('app')
)