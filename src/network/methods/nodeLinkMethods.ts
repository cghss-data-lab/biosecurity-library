import {
  AppGraphData,
  GraphLink,
  GraphNode,
  LinkDirections,
  TableConfig,
} from '../helpers'

/**
 * Returns the node's neighbors to the specified degree, including all links
 *
 * @param node The node
 *
 * @param allowedNeighborDepth
 * The maximum degree of neighbor to include, defaults to 1
 *
 * @returns The graph data for the node's neighborhood
 */
export function getNeighborhood(
  node: GraphNode,
  graphData: AppGraphData,
  allowedNeighborDepth: number = 1,
  tableConfig?: TableConfig
): AppGraphData {
  if (allowedNeighborDepth === 0)
    return {
      nodes: [node],
      links: getLinksForNodesWithIds(
        [node._id],
        graphData.links,
        LinkDirections.both
      ),
    }

  let shownLinks: GraphLink[] = []
  let checkedNodesIds: (string | number)[] = [node._id]
  let neighborLevel: number = 0
  let primaryNodesIds: (string | number)[] = [node._id]
  while (neighborLevel < allowedNeighborDepth) {
    // Get all links for the current primary set and
    // add them to the set of visible links
    const allPrimaryLinks: GraphLink[] = getLinksForNodesWithIds(
      primaryNodesIds,
      graphData.links,
      LinkDirections.either
    )
    shownLinks = shownLinks.concat(allPrimaryLinks)

    // get node IDs from primary links that aren't already in the visible
    // node set and add them
    // N/A

    // set the current primary set equal to all nodes in shown links that
    // were not already in the checked nodes list

    const secondaryNodesIds: (string | number)[] = getNodeIdsForLinks(
      shownLinks
    ).filter(
      // eslint-disable-next-line no-loop-func
      nId => !primaryNodesIds.includes(nId) && !checkedNodesIds.includes(nId)
    )

    const allSecondaryLinks: GraphLink[] = getLinksForNodesWithIds(
      secondaryNodesIds,
      graphData.links,
      LinkDirections.both
    )
    shownLinks = shownLinks.concat(allSecondaryLinks)

    // update the checked nodes list
    checkedNodesIds = [
      ...new Set([
        ...primaryNodesIds,
        ...secondaryNodesIds,
        ...checkedNodesIds,
      ]),
    ]
    primaryNodesIds = secondaryNodesIds
    neighborLevel += 1
  }
  shownLinks.forEach(l => {
    delete l.color
  })
  const ignoreNodeType: boolean =
    tableConfig === undefined || tableConfig.nodeTypes.length === 0

  let shownNodes: GraphNode[] = graphData.nodes

  if (!ignoreNodeType)
    tableConfig?.nodeTypes.forEach(nt => {
      if (!nt.config.hideUnselected) return
      graphData.nodes.forEach(n => {
        if (n._nodeType !== nt.name) return
        n._show = checkedNodesIds.includes(n._id)
      })
      shownNodes = graphData.nodes.filter(n => {
        return n._nodeType !== nt.name || n._show
      })
    })
  else {
    graphData.nodes.forEach(n => {
      n._show = checkedNodesIds.includes(n._id)
    })
    shownNodes = graphData.nodes.filter(n => {
      return n._show
    })
  }

  return { nodes: shownNodes, links: shownLinks }
}

/**
 * Returns the graph links that have a source and target with one of the
 * provided node IDs
 *
 * @param ids The node ID(s)
 *
 * @param linkDir
 * The direction(s) for which the link must have an ID match.
 * Defaults to either.
 *
 * @returns The links
 */
export function getLinksForNodesWithIds(
  ids: (string | number)[],
  links: GraphLink[],
  linkDir: LinkDirections = LinkDirections.either
): GraphLink[] {
  // TODO Refactor method
  if (links.length === 0) return []
  const isStruct: boolean = (links[0].source as GraphNode)._id !== undefined
  const getHasId: (l: any, field: 'source' | 'target') => boolean = isStruct
    ? (l, field) => ids.includes((l[field] as GraphNode)._id)
    : (l, field) => ids.includes(l[field] as string)
  return links.filter(l => {
    const sourceHasId: boolean = getHasId(l, 'source')
    const targetHasId: boolean = getHasId(l, 'target')
    if (linkDir === LinkDirections.both) return sourceHasId && targetHasId
    if (linkDir === LinkDirections.either) return sourceHasId || targetHasId
    if (linkDir === LinkDirections.source) return sourceHasId
    if (linkDir === LinkDirections.target) return targetHasId
    return false
  })
}
/**
 * Given a list of graph links, returns the node IDs for all sources and
 * targets of those links as a unique list.
 *
 * @param links The links
 *
 * @param sides Optional: Whether to return IDs for source, targ, or both
 *
 * @returns The list of IDs
 */
export function getNodeIdsForLinks(
  links: GraphLink[],
  sides: 'source' | 'target' | 'both' = 'both'
): (string | number)[] {
  // TODO Refactor method
  if (links.length === 0) return []
  const isStruct: boolean = (links[0].source as GraphNode)._id !== undefined
  if (sides === 'both')
    return isStruct
      ? [
          ...new Set(
            links
              .map(n => [
                (n.source as GraphNode)._id,
                (n.target as GraphNode)._id,
              ])
              .flat()
          ),
        ]
      : [
          ...new Set(
            links.map(n => [n.source as string, n.target as string]).flat()
          ),
        ]
  return isStruct
    ? [...new Set(links.map(n => [(n[sides] as GraphNode)._id]).flat())]
    : [...new Set(links.map(n => [n[sides] as string]).flat())]
}
