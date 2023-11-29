import { AppGraphData, GraphLink, GraphNode } from '..'

/**
 * Define set of nodes and links between them.
 */
export class NetworkData {
  nodes: GraphNode[]
  links: GraphLink[]

  constructor() {
    this.nodes = []
    this.links = []
  }

  /**
   * Return this network graph data in format required by network
   * map components.
   */
  getDataForMap(): AppGraphData {
    return {
      nodes: this.nodes,
      links: this.links,
    }
  }

  /**
   * Update or add notes based on the input nodes, including updating links.
   * @param {GraphNode[]} inputNodes The input nodes
   */
  updateNodes(inputNodes: GraphNode[]): void {
    const existingNodes: GraphNode[] = this.nodes
      .map((n: GraphNode) => {
        const match: GraphNode | undefined = inputNodes.find(
          nn => nn._id === n._id
        )
        if (match !== undefined) {
          return { ...match, x: n.x, y: n.y, fx: n.x, fy: n.y }
        }
        return null
      })
      .filter(v => v !== null) as GraphNode[]
    const existingNodeIds = existingNodes.map((n: GraphNode) => n._id)
    const trulyNewNodes: GraphNode[] = inputNodes.filter(
      (nn: any) => !existingNodeIds.includes(nn._id)
    )

    const updatedNodes: GraphNode[] = [...existingNodes, ...trulyNewNodes]
    this.nodes = updatedNodes
    this.links = this.links.map((l: any) => {
      const newSource: any = updatedNodes.find(n => n._id === l.source._id)
      const newTarget: any = updatedNodes.find(n => n._id === l.target._id)
      return {
        ...l,
        source: newSource !== undefined ? newSource : l.source,
        target: newTarget !== undefined ? newTarget : l.target,
      }
    })
  }
  /**
   * Update or add notes based on the input links.
   * @param {GraphNode[]} inputLinks The input links
   */
  updateLinks(inputLinks: GraphLink[]): void {
    this.links = inputLinks
  }

  async updateDataFromSource(ds: any): Promise<void> {
    this.updateLinks(ds.links)
    this.updateNodes(ds.nodes)
  }
}
