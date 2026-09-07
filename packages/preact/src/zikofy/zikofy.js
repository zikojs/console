import { UIElement } from 'ziko/dom';
import { domify } from './domify.js';

export function zikofy(Component, props, ...children) {
    const DOMIFIED = domify(Component, props, ...children)
    return Array.isArray(DOMIFIED) 
            ? DOMIFIED.map( el => new UIElement({ element : el }))
            : new UIElement({ element : DOMIFIED })
}

