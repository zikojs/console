import { UIElement } from 'ziko/ui';
import { domify } from './domify.js';

export function zikofy(Component, props) {
    return new UIElement({
        element : domify(Component, props)
    })
}

