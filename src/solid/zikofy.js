import { UIElement } from 'ziko/ui';
import { domify } from './domify.js';

export function zikofy(Component, props) {
    const DOMIFIED = domify(Component, props)
    return Array.isArray(DOMIFIED) 
            ? DOMIFIED.map( el => new UIElement({ element : el }))
            : new UIElement({ element : DOMIFIED })
}

