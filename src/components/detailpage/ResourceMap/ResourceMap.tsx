/**
 * Resource map showing links between resources that depend on each other.
 * TODO complete with real data
 */

import React from 'react'
import { GraphNode, Network } from '@mvanmaele/mvanmaele-test.viz.network'
/**
 * TODO
 * @returns Resource map
 */
export const ResourceMap = () => {
  // TODO replace demo data with real data
  return (
    <Network
      initGraphData={{
        nodes: [initNode('Node 1', 1), initNode('Node 2', 2)],
        links: [{ source: 1, target: 2, value: 1 }],
      }}
    />
  )
}

/**
 * Return initialized graph node with given label and unique ID
 * @param label Node label
 * @param id Node unique ID
 * @returns Initialized node
 */
function initNode(label: string, id: number): GraphNode {
  return {
    _label: label,
    _id: id,
    _color: 'skyblue',
    _shape: 'circle',
    _nodeType: 'default',
    _show: true,
    _fontSize: 16,
    _icon: '',
    _showLabel: true,
    _labelPos: 'bottom',
    _size: 1,
  }
}
