/**
 * Custom types for ResourceMap component, mainly derived from viz.network
 */
import { GraphNode, GraphLink } from '@mvanmaele/mvanmaele-test.viz.network'
export type HyperlinkedNode = GraphNode & {
  url?: string
}
export interface HyperlinkedGraphData {
  nodes: HyperlinkedNode[]
  links: GraphLink[]
}
