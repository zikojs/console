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

|Library|Mount|Props|Demo|
|-|-|-|-|
|react|✅||
|preact|✅|✅|[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/zakarialaoui10-zikofy-auvvkrmq?file=src%2Fmain.jsx)
|solid|✅|✅|
|svelte|✅|✅|
|vue|✅||