# zikofy

Turns foreign components into native zikojs `UIElement`

## Install 

```bash
    npm i zikofy
```

## Usage 

```js
import { zikofy } from 'zikofy/[UI_Library]'
import ForeignCompoent from './ForeignComponent'

const props = {}
const ZikoComponent = zikofy(ForeignComponent, props)

```

## Current Supports

|Library|Mount|Props|
|-|-|-|
|react|✅||
|preact|✅||
|solid|✅|✅|
|svelte|✅|✅|
|vue|✅||