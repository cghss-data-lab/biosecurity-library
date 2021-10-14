/**
 * Resource map showing links between resources that depend on each other.
 * TODO complete with true data
 */

import React from 'react'
import { GraphNode, Network } from '@mvanmaele/mvanmaele-test.viz.network'
import { PageContext } from '../../../templates/Detail'

const LABEL_FIELD: 'Resource_name' | 'Short_name' = 'Short_name'
const RELATED_FIELDS: 'Auto_other_resources_cited'[] = [
  'Auto_other_resources_cited',
]

// interface ResourceMapProps {}
/**
 * TODO
 * @returns Resource map
 */
export const ResourceMap: React.FC<PageContext> = ({ data }) => {
  const hideMap: boolean =
    data === undefined ||
    data.Auto_other_resources_cited === null ||
    data.Auto_other_resources_cited.length === 0

  console.log(data)
  console.log('hideMap = ' + hideMap)

  // TODO replace demo data with real data
  if (hideMap) return null
  return (
    <Network
      initGraphData={{
        nodes: getResourceMapNodes(data),
        links: [],
        // links: [{ source: 1, target: 2, value: 1 }],
      }}
    />
  )
}

/**
 * Returns a list of resource map nodes that are related to the node with the
 * given data.
 * @param data The resource's data from its Airtable record
 * @returns The list of nodes that are related to this one
 */
function getResourceMapNodes(data: PageContext['data']): GraphNode[] {
  const nodes: GraphNode[] = [initNode(data[LABEL_FIELD], data[LABEL_FIELD])]
  RELATED_FIELDS.forEach(field => {
    data[field].forEach(id => {
      // TODO parse name from ID
      // TODO parse links
      nodes.push(initNode(id, id))
    })
  })
  return nodes
}

/**
 * Return initialized graph node with given label and unique ID
 * @param label Node label
 * @param id Node unique ID
 * @returns Initialized node
 */
function initNode(label: string, id: number | string): GraphNode {
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

export default ResourceMap
