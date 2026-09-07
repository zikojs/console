import './style.css'
import { zikofy } from '@zikojs/preact'
import _Hello from './components/Hello.jsx'

const Hello = zikofy(_Hello)

Hello.mount(document.body)