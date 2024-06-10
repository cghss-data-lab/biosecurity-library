/**
 * Custom types for ResourceMap component, mainly derived from viz.network
 */
import {
  GraphNode,
  GraphLink,
} from '../../../../../../viz/charts/network-tools'
export type HyperlinkedNode = GraphNode & {
  url?: string
}
export interface HyperlinkedGraphData {
  nodes: HyperlinkedNode[]
  links: GraphLink[]
}
