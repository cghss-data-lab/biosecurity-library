/**
 * Custom types for ResourceMap component, mainly derived from viz.network
 */
import { GraphNode, GraphLink } from '@network/index'
export type HyperlinkedNode = GraphNode & {
  url?: string
}
export interface HyperlinkedGraphData {
  nodes: HyperlinkedNode[]
  links: GraphLink[]
}
