/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.jsx'
import { domify, zikofy } from 'zikofy/solid'

globalThis.app = zikofy(App)

const root = document.getElementById('root')
globalThis.app = zikofy(App, { name : 'zikkkos'})
app.forEach(
    el => el.mount(root)
)

