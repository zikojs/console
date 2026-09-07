import { render, h } from 'preact';

export function domify(Component, props, ...children) {
    const container = document.createElement('div')
    render(
        h(Component, {...props, children}), 
        container
    )
    if(container.children.length === 1) return container.firstChild;
    return [...container.children];
}