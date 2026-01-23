import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { zikofy } from 'zikofy/svelte'

globalThis.app = zikofy(App)

// const app = mount(App, {
//   target: document.getElementById('app'),
// })

// export default app
