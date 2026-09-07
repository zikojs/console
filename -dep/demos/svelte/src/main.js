import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { zikofy } from 'zikofy/svelte'

globalThis.app = zikofy(App, {start : 15})
app.mount(document.getElementById('app'))


