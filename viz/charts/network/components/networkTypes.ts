import { AppGraphData, GraphNode } from '../../network-tools'

/**
 * Return initialized graph node with given label and unique ID
 * @param label Node label
 * @param id Node unique ID
 * @param shape Optional: The node shape.
 * @returns Initialized node
 */
export function initNode(
  label: string,
  id: number,
  shape?: 'circle' | 'square'
): GraphNode {
  return {
    _label: label,
    _labelFontWeight: '600',
    _labelYOffset: id === 1 ? 1.5 : 0,
    _backgroundColor: '#F6D35650',
    _backgroundSize: id === 1 ? 1.5 : 0,
    // _backgroundSize: id === 1 ? 7.5 : 0,
    // _backgroundShape: "hexagon",
    // _labelColor: "#ff0000",
    // _labelFont: `bold 5px 'Open Sans'`,
    _id: id,
    _color: '#0D2449',
    _shape: shape || 'circle',
    _nodeType: 'default',
    _show: true,
    _fontSize: 16,
    _icon: '',
    //     _icon: `
    // <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    //       <path d="M26.25 4.96881H17.5C17.1675 4.96881 16.85 5.10006 16.6162 5.33506L15 6.95131L13.3837 5.33506C13.1487 5.10006 12.8325 4.96881 12.5 4.96881H3.74997C3.05872 4.96881 2.49997 5.52881 2.49997 6.21881V22.4688C2.49997 23.1588 3.05872 23.7188 3.74997 23.7188H11.9825L14.1162 25.8526C14.36 26.0976 14.68 26.2188 15 26.2188C15.32 26.2188 15.64 26.0976 15.8837 25.8526L18.0175 23.7188H26.25C26.9412 23.7188 27.5 23.1588 27.5 22.4688V6.21881C27.5 5.52881 26.9412 4.96881 26.25 4.96881ZM12.5 19.9688H4.99872V18.7188H12.5V19.9688ZM12.5 16.2188H4.99872V14.9688H12.5V16.2188ZM12.5 12.4688H7.49997V11.2188H12.5V12.4688ZM25 19.9688H17.5V18.7188H25V19.9688ZM25 16.2188H17.5V14.9688H25V16.2188ZM22.5 12.4688H17.5V11.2188H22.5V12.4688Z" fill="#EDB458"/>
    //     </svg>
    //     `,
    _showLabel: true,
    _labelPos: 'bottom',
    _size: 1,
  }
}

/**
 * Empty graph data structure.
 */
export const emptyGraphData: AppGraphData = {
  nodes: [],
  links: [],
}

/**
 * Simple set of nodes and links for demonstration purposes.
 */
export const demoGraphData: AppGraphData = {
  nodes: [
    initNode('Node 1', 1, 'square'),
    initNode('Node 2', 2),
    initNode('Node 3', 3),
    initNode('Node 4', 4),
    initNode('Node 5', 5),
  ],
  links: [
    { source: 1, target: 1, value: 1 },
    { source: 1, target: 2, value: 1 },
    { source: 2, target: 3, value: 1 },
    { source: 2, target: 4, value: 1 },
    { source: 4, target: 1, value: 1 },
    { source: 5, target: 1, value: 1 },
    { source: 5, target: 4, value: 1 },
    { source: 5, target: 3, value: 1 },
    { source: 5, target: 2, value: 1 },
  ],
}
