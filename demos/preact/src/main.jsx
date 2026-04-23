import './index.css'
import { App } from './app.jsx'
import { zikofy } from 'zikofy/preact';
import { tags } from 'ziko/domm';

const ZIKOJS_LOGO_URL = 'https://raw.githubusercontent.com/zakarialaoui10/zikojs/9339509291a848fa30fdea42e9cc0d6f84828bdb/docs/src/assets/logo-200.svg'
 
const app = zikofy(App, { start : 5, step : 2});

app.forEach(el => el.mount(document.getElementById('app')))

app[0].append(
    tags.img({src : ZIKOJS_LOGO_URL}).setAttr({class : 'logo'})
)

app[0].onPtrEnter(
    e=> e.target.style({ 
        transform : `scale(1.2, 1.2)`,
        transition : `transform .3s`
    })
)

app[0].onPtrLeave(
    e=> e.target.style({ 
        transform : `scale(1, 1)`,
        transition : `transform .3s`
    })
)

app[1].append(' + Zikojs')

