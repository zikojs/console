import { render, h } from 'preact';

export function domify(Component, props) {
    const container = document.createElement('div')
    render(
        h(Component, props), 
        container
    )
    return container.firstChild
}