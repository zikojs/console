# @zikojs/preact-console

A console-like UI component for **Preact** that renders JavaScript console output directly inside your application.

`@zikojs/preact-console` provides JSX components that mimic common browser console methods such as `console.log()`, `console.warn()`, and `console.table()` while rendering the output as part of the Preact UI.

## ✨ Features

* 🖥️ Console-like output rendered directly in the DOM
* ⚛️ Designed for Preact and JSX
* 🔍 Supports JavaScript objects and arrays
* 📋 Table-style rendering for structured data
* ⚠️ Dedicated warning output
* 🧩 Component-based API
* 🎨 Can be styled with CSS
* 🪶 Lightweight and focused
* 🔌 Useful for notebooks, playgrounds, documentation, and developer tools

## 📦 Installation

```bash
npm install @zikojs/preact-console
```

Or with pnpm:

```bash
pnpm add @zikojs/preact-console
```

## 🚀 Usage

Import `Console` and use its methods as JSX components:

```jsx
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
      {{ window }}
    </Console.warn>
  </>,
  document.getElementById('app')
)
```

## 📝 Console Methods

### `Console.log`

Renders standard console output.

```jsx
<Console.log>
  {'Hello World'}
</Console.log>
```

It can also render arrays:

```jsx
<Console.log>
  {[1, 2, 3, 4]}
</Console.log>
```

Or objects:

```jsx
<Console.log>
  {{
    name: 'ZikoJS',
    version: '2.0.0',
    type: 'library'
  }}
</Console.log>
```

### `Console.warn`

Renders warning-style console output.

```jsx
<Console.warn>
  {'This is a warning'}
</Console.warn>
```

Objects can be inspected as well:

```jsx
<Console.warn>
  {{ window }}
</Console.warn>
```

### `Console.table`

Renders data using a table-oriented representation.

```jsx
<Console.table>
  {[
    ['Item 1', 10],
    ['Item 2', 20],
    ['Item 3', 30]
  ]}
</Console.table>
```

Objects can also be passed:

```jsx
<Console.table>
  {[
    { name: 'Item 1', value: 10 },
    { name: 'Item 2', value: 20 },
    { name: 'Item 3', value: 30 }
  ]}
</Console.table>
```

## 🔍 Inspecting Objects

`@zikojs/preact-console` is designed to display JavaScript values in a console-like format rather than simply converting them to strings.

For example:

```jsx
<Console.log>
  {{
    user: {
      name: 'John',
      age: 25
    },
    items: [1, 2, 3]
  }}
</Console.log>
```

This makes the component useful for displaying complex runtime values in interactive applications.

## 🧩 Using Multiple Console Outputs

Console components can be combined naturally:

```jsx
import { render } from 'preact'
import { Console } from '@zikojs/preact-console'

function App() {
  return (
    <div>
      <Console.log>
        {'Application started'}
      </Console.log>

      <Console.log>
        {[1, 2, 3]}
      </Console.log>

      <Console.warn>
        {'Something may require your attention'}
      </Console.warn>

      <Console.table>
        {[
          { name: 'Alice', score: 95 },
          { name: 'Bob', score: 87 }
        ]}
      </Console.table>
    </div>
  )
}

render(<App />, document.getElementById('app'))
```

<!-- ## 🎨 Styling

The console is rendered as regular DOM content, so it can be styled using CSS.

```css
.console {
  font-family: monospace;
  font-size: 14px;
}
```

You can integrate the console into your application's existing theme without requiring a separate state-based theme system. -->

## 🧪 Playground / Notebook Usage

The component is particularly useful for interactive environments such as:

* JavaScript playgrounds
* Code editors
* Notebooks
* Documentation websites
* REPLs
* Educational applications
* Developer tools
* Component demos

For example, a notebook can render the result of:

```js
console.log(value)
```

as a component inside the notebook output area instead of writing to the browser's DevTools console.

## 🔗 ZikoJS Ecosystem

`@zikojs/preact-console` is part of the broader **ZikoJS ecosystem**, which provides UI primitives, framework integrations, developer tools, and other web development utilities.

Related packages include:

* `ziko` : ZikoJS core
* `@zikojs/preact` : ZikoJS ↔ Preact integration
* `@zikojs/console` : framework-independent ZikoJS 

ZikoJS itself is organized as a modular ecosystem with integrations for multiple UI frameworks.

## 📄 License

MIT
