import { HTMLElement } from 'node-html-parser'

// replace the fill and stroke colors on all child
// elements of the SVG; but only if those elements
// already have a fill or stroke set, recursively
// traversing nested SVG elements.
const replaceFill = (dom: HTMLElement, color: string) => {
  // this uses node-html-parser instead of native DOM
  // so that it will support server-side-rendering.
  // const svgElement = svgDom.querySelector('svg')!
  const children = dom.childNodes
  if (children)
    for (let child of children) {
      // note this is the node-html-parser implementation
      // of the HTMLElement class, not a native HTMLElement
      if (child instanceof HTMLElement) {
        // recursive call handles nested SVG structures like groups
        if (child.childNodes) replaceFill(child, color)
        if (child.hasAttribute('fill')) child.setAttribute('fill', color)
        if (child.hasAttribute('stroke')) child.setAttribute('stroke', color)
      }
    }
  return dom
}

export default replaceFill
