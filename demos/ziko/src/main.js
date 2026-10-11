import {
  Console
} from '@zikojs/console'

import { tags } from 'ziko/dom'

tags.section(
  Console.log('Hello world'),
  Console.log({ a : 1, b: 2}),
  Console.table(
    [
    {
      name : 'ziko',
      age : 28
    },
    {
      name : 'ziko',
      age : 28
    },
    [1,2]
    ]
  ),
  Console.warn('KKK'),
  Console.error(new Error('jjj')),
  Console.log(window),
).mount(document.body)
