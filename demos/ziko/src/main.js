import {
  Console
} from '@zikojs/console'

import { tags } from 'ziko/dom'

tags.section(
  Console.log(new Map([['a', '1'], ['b', '1'], ['c', '1'], ['d', '1']])),
  Console.log('kkk', { a : 1, b: 2}),
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
  Console.table(window),
).mount(document.body)
