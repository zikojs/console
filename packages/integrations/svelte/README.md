# @zikojs/svelte-console

A console-like UI component for **Svelte** that renders JavaScript console output directly inside your application.

![Svelte console](../../../assets/svelte-console.png)

`@zikojs/svelte-console` provides Svelte components that mimic common browser console methods such as `console.log()`, `console.warn()`, and `console.table()` while rendering the output as part of your Svelte UI.

## ✨ Features

* 🖥️ Console-like output rendered directly in the DOM
* 🧡 Designed for Svelte
* 🔍 Supports JavaScript objects and arrays
* 📋 Table-style rendering for structured data
* ⚠️ Dedicated warning output
* 🧩 Component-based API
* 🎨 Can be styled with CSS
* 🪶 Lightweight and focused
* 🔌 Useful for notebooks, playgrounds, documentation, and developer tools

## 📦 Installation

```bash
npm install @zikojs/svelte-console
```

Or with pnpm:

```bash
pnpm add @zikojs/svelte-console
```

## 🚀 Usage

Import the console components into your Svelte application:

```svelte
<script>
  import {
    ConsoleLog,
    ConsoleWarn,
    ConsoleTable
  } from '@zikojs/svelte-console'
</script>

<ConsoleLog value="Hello World" />

<ConsoleLog value={[1, 2, 3, 4]} />

<ConsoleWarn value="This is a warning" />

<ConsoleTable
  value={[
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 87 }
  ]}
/>
```

> **Note:** The component names and props above assume the integration exports `ConsoleLog`, `ConsoleWarn`, and `ConsoleTable` with a `value` prop. Adapt these names to match the package's actual public API.

## 📝 Console Components

### `ConsoleLog`

Renders standard console output.

```svelte
<script>
  import { ConsoleLog } from '@zikojs/svelte-console'

  const message = 'Application started'
  const numbers = [1, 2, 3, 4]

  const user = {
    name: 'ZikoJS',
    version: '2.0.0',
    type: 'library'
  }
</script>

<ConsoleLog value={message} />
<ConsoleLog value={numbers} />
<ConsoleLog value={user} />
```

### `ConsoleWarn`

Renders warning-style console output.

```svelte
<script>
  import { ConsoleWarn } from '@zikojs/svelte-console'

  const message = 'This is a warning'

  const details = {
    code: 'WARN_001',
    message: 'A configuration value is missing'
  }
</script>

<ConsoleWarn value={message} />
<ConsoleWarn value={details} />
```

### `ConsoleTable`

Renders structured data using a table-oriented representation.

```svelte
<script>
  import { ConsoleTable } from '@zikojs/svelte-console'

  const items = [
    { name: 'Item 1', value: 10 },
    { name: 'Item 2', value: 20 },
    { name: 'Item 3', value: 30 }
  ]
</script>

<ConsoleTable value={items} />
```

Arrays of arrays can also be used:

```svelte
<script>
  import { ConsoleTable } from '@zikojs/svelte-console'

  const rows = [
    ['Item 1', 10],
    ['Item 2', 20],
    ['Item 3', 30]
  ]
</script>

<ConsoleTable value={rows} />
```

## 🔍 Inspecting Objects

The integration is intended to display JavaScript values in a console-like format rather than simply converting them to strings.

```svelte
<script>
  import { ConsoleLog } from '@zikojs/svelte-console'

  const data = {
    user: {
      name: 'John',
      age: 25
    },
    items: [1, 2, 3],
    active: true
  }
</script>

<ConsoleLog value={data} />
```

This makes the component useful for displaying complex runtime values in interactive applications.

## 🧩 Using Multiple Console Outputs

Console components can be combined naturally inside a Svelte component.

```svelte
<script>
  import {
    ConsoleLog,
    ConsoleWarn,
    ConsoleTable
  } from '@zikojs/svelte-console'

  const numbers = [1, 2, 3]

  const users = [
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 87 }
  ]
</script>

<div>
  <ConsoleLog value="Application started" />

  <ConsoleLog value={numbers} />

  <ConsoleWarn value="Something may require your attention" />

  <ConsoleTable value={users} />
</div>
```

## 🎨 Styling

The console is rendered as DOM content and can be styled using CSS.

```css
.console {
  font-family: monospace;
  font-size: 14px;
}
```

You can integrate the console into your application's existing styles without requiring a separate theme-management system.

## 🧪 Playground / Notebook Usage

`@zikojs/svelte-console` is particularly useful for interactive environments such as:

* JavaScript playgrounds
* Code editors
* Notebooks
* Documentation websites
* REPLs
* Educational applications
* Developer tools
* Component demos

For example, a notebook can display the output of:

```js
console.log(value)
```

inside its output area instead of writing exclusively to the browser's DevTools console.

## 🔗 ZikoJS Ecosystem

`@zikojs/svelte-console` is part of the broader **ZikoJS ecosystem**, which provides UI primitives, framework integrations, developer tools, and other web development utilities.

Related packages include:

* [`ziko`](https://www.npmjs.com/package/ziko) — ZikoJS core
* [`@zikojs/console`](https://www.npmjs.com/package/@zikojs/console) — Framework-independent console rendering
* [`@zikojs/preact-console`](https://www.npmjs.com/package/@zikojs/preact-console) — Preact integration

ZikoJS is organized as a modular ecosystem with integrations for multiple UI frameworks.

## 📄 License

MIT
