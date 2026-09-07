import './style.css'
import { zikofy } from '@zikojs/preact'
import _Hello from './components/Hello.jsx'
import _Counter from './components/Counter.jsx'
import _Button from './components/Button.jsx'


const Hello = () => zikofy(_Hello)
const Counter = () => zikofy(_Counter, {})
const Button = () => zikofy(_Button, {}, 'Hello jjd', _Hello())

Hello().mount(document.body).onClick(e => console.log(e))
Counter().mount(document.body)
Button().mount(document.body)