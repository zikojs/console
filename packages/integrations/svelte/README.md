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
    Console,
  } from '@zikojs/svelte-console'
</script>

<Console.log items="Hello World" />

<Console.log items={[1, 2, 3, 4]} />

<Console.wran items="This is a warning" />

<Console.table
  items={[
    { name: 'Alice', score: 95 },
    { name: 'Bob', score: 87 }
  ]}
/>
```

## 🔗 ZikoJS Ecosystem

`@zikojs/svelte-console` is part of the broader **ZikoJS ecosystem**, which provides UI primitives, framework integrations, developer tools, and other web development utilities.

Related packages include:

* [`ziko`](https://www.npmjs.com/package/ziko) — ZikoJS core
* [`@zikojs/console`](https://www.npmjs.com/package/@zikojs/console) — Framework-independent console rendering
* [`@zikojs/preact-console`](https://www.npmjs.com/package/@zikojs/preact-console) — Preact integration

ZikoJS is organized as a modular ecosystem with integrations for multiple UI frameworks.

## 📄 License

MIT
