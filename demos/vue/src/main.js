import './style.css'
import App from './App.vue'
import { zikofy } from 'zikofy/vue'


globalThis.app = zikofy(App)
app.forEach(
    el => el.mount(document.getElementById("app"))
)
