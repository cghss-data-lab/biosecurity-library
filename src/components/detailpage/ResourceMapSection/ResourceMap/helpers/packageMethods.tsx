/**
 * Helper functions for preparing resource map data that should eventually be
 * refactored into the viz.network package on bit.dev.
 */
import { LinkField, PageContext } from '../../../../../templates/Detail'
import {
  AppGraphData,
  GraphLink,
  GraphNode,
  getNeighborhood,
} from '@talus-analytics/viz.charts.network/dist/helpers'
import { HyperlinkedGraphData, HyperlinkedNode } from './resourceMapTypes'
import * as urls from '../../../../../utilities/urls'

/**
 * Define different directions of links.
 */
export enum LinkDirections {
  source,
  target,
  both,
  either,
}

type DefinedPageDataFields = keyof Omit<
  PageContext['data'],
  'resourceMapData' | 'Edition' | 'Auto_other_resources_cited' | 'Resource_sets'
>

/**
 * Thrown when a node with the defined ID is expected to exist but not found
 */
class MissingNodeError extends Error {
  constructor(missingId: string) {
    super(
      `Expected to find node with record ID = ${missingId}, but none found.`
    )
  }
}

/**
 * Returns full resource map data object based on Airtable query result.
 *
 * Given a list of page context data objects from an Airtable query response,
 * and a list of field names that represent links between those objects (linked
 * record columns), returns the nodes and links to visualize a resource map of
 * all the objects.
 *
 * @param queryResponse All page context data objects returned from
 * Airtable query
 * @param edgeFields List of fields in each data object that define an edge
 * @param nameField Data object field that should be used as the node's name
 * @param idField Data object field that should be used as the node's unique ID
 * @returns The graph data represented by those objects, given edge field names
 */
export function getFullResourceMapData(
  queryResponse: { data: PageContext['data'] }[],
  linkFields: LinkField[],
  nameField: DefinedPageDataFields, // omit undef
  idField: DefinedPageDataFields,
  iconField?: DefinedPageDataFields
): AppGraphData {
  const nodes: GraphNode[] = []
  const links: GraphLink[] = []
  // create one node per query response datum
  queryResponse.forEach(({ data }) => {
    const node: HyperlinkedNode = initResourceMapNode(
      data,
      nameField,
      idField,
      iconField
    )
    nodes.push(node)
  })

  queryResponse.forEach(({ data }) => {
    const node: GraphNode | undefined = nodes.find(n => {
      return n._id === data[idField]
    })
    if (node === undefined) {
      throw new MissingNodeError(data[idField].toString())
    }

    // add one link per connection
    linkFields.forEach(lf => {
      const value = data[lf]
      if (value === null) return
      // get unique IDs in link field for record
      const linkFieldIds: string[] =
        data[lf] !== null
          ? [...new Set(value.map(d => d.data.Record_ID_INTERNAL))]
          : []
      linkFieldIds.forEach(rId => {
        const otherNode: GraphNode | undefined = nodes.find(n => {
          return n._id === rId
        })
        if (otherNode === undefined) throw new MissingNodeError(rId)
        links.push({ source: node._id, target: otherNode._id })
      })
    })
  })

  return { nodes, links }
}

/**
 * Returns nodes/links for just the defined resource's resource map.
 * @param resourceId The ID of the resource for the purposes of the resource map
 * @param allResourceMapData Nodes and links data for all resources
 * @returns {HyperlinkedGraphData} The nodes/links for just the resource
 */
export function getResourceMapData(
  resourceId: string,
  allResourceMapData: AppGraphData
): HyperlinkedGraphData {
  const node: GraphNode | undefined = allResourceMapData.nodes.find(
    n => n._id === resourceId
  )
  if (node === undefined)
    throw new Error(
      `Resource with the following value for "_id" was expected in variable` +
        ` "allResourceMapData" but not found: ${resourceId}.`
    )

  return getNeighborhood(node, allResourceMapData, 1)
}

/**
 * Create a node for a resource map based on the resource's Airtable data.
 * @param data The query response datum on which to base the node
 * @param nameField The datum field that should be used as the node's name
 * @param idField The datum field that should be used as the node's unique ID
 * @param def The datum field that should be used as the node's unique ID
 * @returns The initialized node
 */
export function initResourceMapNode(
  data: PageContext['data'],
  nameField: DefinedPageDataFields, // omit undef
  idField: DefinedPageDataFields,
  iconField?: DefinedPageDataFields
): HyperlinkedNode {
  return {
    _id: data[idField].toString(),
    url: urls.getDetailURL(data),
    _label: data[nameField].toString(),
    _icon: iconField !== undefined ? data[iconField].toString() : '',
  }
}
