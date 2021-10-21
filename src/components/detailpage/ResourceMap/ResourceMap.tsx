/**
 * Resource map showing links between resources that depend on each other.
 * TODO fix icon flicker
 * TODO allow edge color to be set dynamically
 * TODO legend defining edges
 * TODO allow max words in label lines to be controlled
 * TODO don't make hovered labels reflow when they're longer than container
 */

import React, { useCallback, useMemo, useState } from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import { LinkObject } from 'react-force-graph-2d'

import {
  IconsQueryMap,
  replaceFill,
} from '../../../airtable-cms/AirtableCMSIcon'
import * as network from '@mvanmaele/mvanmaele-test.viz.network'
import { getNodeIdsForLinks } from './helpers/resourceMapHelpers'
import Legend from './Legend/Legend'
import Entry from './Legend/Entry'
import CurvedEdgeEntry from './Legend/CurvedEdgeEntry'

/**
 * Icon data from Airtable
 */
type Icon = {
  data: { Name: string; Text: string; SVG: any }
}

/**
 * Resource map container
 */
const CONTAINER_SIZE: number = 500
const ResourceMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${CONTAINER_SIZE}px;
`

/**
 * Display interactive resource map with provided graph data (nodes and links)
 * @param selectedNodeId Optional: The ID of the selected node, which may be
 * styled differently than the others, etc.
 * @param graphData Optional: The nodes and links. No map shown if undefined.
 * @param curvedlinks Optional: True if curved links should be drawn, false if
 * straight; defaults to true.
 * @returns Resource map
 */
export const ResourceMap: React.FC<{
  selectedNodeId?: string
  graphData?: network.AppGraphData
  curvedLinks?: boolean
}> = ({ selectedNodeId, graphData, curvedLinks = true }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const {
    iconsQueryMap: { nodes: icons },
  } = useStaticQuery<IconsQueryMap>(graphql`
    query iconsQueryMap {
      iconsQueryMap: allAirtable(filter: { table: { eq: "Icons" } }) {
        nodes {
          data {
            Name
            Text
            SVG {
              localFiles {
                childSvg {
                  svgString
                }
              }
            }
          }
        }
      }
    }
  `)
  const theme: any = useTheme()

  const formattedGraphData: network.AppGraphData | undefined = useMemo(
    () => formatGraphData(graphData, icons, theme),
    [graphData, icons, theme]
  )

  /**
   * Fired when node is clicked to navigate to that node's resource page
   * @param n The clicked node object
   */
  const onNodeClick = useCallback(
    (n: { url?: string; _id?: string; id?: string | number }): void => {
      if (n.url !== undefined && n._id !== selectedNodeId) {
        navigate(n.url)
      }
    },
    [selectedNodeId]
  )
  /**
   * Returns directional arrow length for given link.
   *
   * If the link is connected to the hovered node, arrows are shown.
   *
   * @param l The link data
   * @returns The directional arrow length
   */
  const getLinkDirectionalArrowLength = useCallback(
    (l: LinkObject): number => {
      return (l.source as network.GraphNode)._id === hoveredNode ||
        (l.target as network.GraphNode)._id === hoveredNode
        ? 5
        : 0
    },
    [hoveredNode]
  )

  // return null if no map to show
  if (
    graphData === undefined ||
    graphData.nodes.length === 0 ||
    graphData.links.length === 0
  )
    return null

  const citationDesc: string = getCitationCountText(selectedNodeId, graphData)

  return (
    <section>
      <p>{citationDesc}</p>
      <em>Click resource in map to go to page</em>
      <ResourceMapContainer>
        <Legend>
          {/* Link direction legend */}
          {curvedLinks && <CurvedEdgeEntry nodeColor={theme.colorDarker} />}
          {/* Resource type icons legend */}
          {icons
            .filter(icon => {
              return graphData?.nodes.map(n => n._icon).includes(icon.data.Name)
            })
            .map(icon => (
              <Entry label={icon.data.Name} value={icon.data.Name} />
            ))}
        </Legend>
        <network.Network
          containerStyle={{ transition: 'opacity .25s ease-in-out' }}
          linkDirectionalArrowLength={getLinkDirectionalArrowLength}
          linkCurvature={curvedLinks ? 0.5 : 0}
          warmupTicks={1000}
          zoomToFitSettings={{ durationMsec: 0, initDelayMsec: 0 }}
          interactionSettings={{
            enableZoomInteraction: false,
            enablePanInteraction: false,
            maxZoom: 5,
          }}
          onNodeClick={onNodeClick}
          selectedNode={selectedNodeId}
          initGraphData={formattedGraphData}
          {...{ hoveredNode, setHoveredNode }}
        />
      </ResourceMapContainer>
    </section>
  )
}

export default ResourceMap

/**
 * Returns text describing how many resources this one cites or is cited by
 * @param resId The ID of the resource whose page it is
 * @param graphData The nodes and links
 * @returns Text describing citation counts
 */
function getCitationCountText(
  resId: string | undefined,
  graphData: network.AppGraphData
): string {
  if (resId === undefined) return ''
  const cites: number = getUniqueNodeIdCount(graphData, 'target', resId)
  const citedBy: number = getUniqueNodeIdCount(graphData, 'source', resId)
  const citationDesc: string = getCitationString(cites, citedBy)
  return citationDesc
}

/**
 * Returns text describing how many resources this one cites or is cited by
 * @param cites Number of other resources cited
 * @param citedBy Number of other resources cited by
 * @returns Text describing the counts
 */
function getCitationString(cites: number, citedBy: number) {
  let text: string = 'This resource '
  const pieces: string[] = []
  if (cites > 0)
    pieces.push(`cites ${cites} other resource${cites === 1 ? '' : 's'}`)
  if (citedBy > 0)
    pieces.push(
      `is cited by ${citedBy} other resource${citedBy === 1 ? '' : 's'}`
    )
  pieces.forEach((s, i) => {
    if (i > 0) text += ' and ' + s
    else text += s
  })
  text += ` that ${cites + citedBy === 1 ? 'is' : 'are'} also in the library.`
  return text
}

/**
 * Returns the count of unique target/source connections the selected node
 * has in the graph data.
 *
 * @param graphData The nodes and links
 * @param field The field (target or source) for which to count unique node IDs
 * @param selectedNodeId The node whose incoming and outgoing connections are
 * to be counted
 * @returns The count
 */
function getUniqueNodeIdCount(
  graphData: network.AppGraphData,
  field: 'target' | 'source',
  selectedNodeId: string | undefined
): number {
  const otherField: 'target' | 'source' =
    field === 'target' ? 'source' : 'target'
  return [
    ...new Set(
      graphData.links
        .filter(
          l => l[field] !== selectedNodeId && l[otherField] === selectedNodeId
        )
        .map(l => l[field])
    ),
  ].length
}

/**
 * Given input graph data, returns a version of it formatted for display in the
 * project's resource map, i.e., with any applicable Airtable icons
 * @param graphData The input graph data
 * @param icons Icon SVG data from Airtable
 * @param theme Theme from Figma
 * @returns The graph data formatted for display in the resource map
 */
function formatGraphData(
  graphData: network.AppGraphData = { nodes: [], links: [] },
  icons: Icon[],
  theme: any
): network.AppGraphData | undefined {
  const formattedNodes: network.GraphNode[] = getFormattedNodes(
    graphData,
    icons,
    theme
  )
  const formattedLinks: network.GraphLink[] = getFormattedLinks(
    graphData,
    formattedNodes,
    theme
  )
  return {
    nodes: formattedNodes,
    links: formattedLinks,
  }
}

/**
 * Formats the graph data's links for display in the resource map and returns
 * a version of the grpah data with those links
 * @param graphData The input graph data
 * @param formattedNodes The formatted nodes
 * @param theme Theme data from Figma
 * @returns A version of it with links formatted for display
 */
function getFormattedLinks(
  graphData: network.AppGraphData,
  formattedNodes: network.GraphNode[],
  theme: any
): network.GraphLink[] {
  return graphData.links.map(l => {
    const source = formattedNodes.find(n =>
      getNodeIdsForLinks([l], 'source').includes(n._id)
    )
    if (source === undefined) throw new Error('No source found for link')
    const target = formattedNodes.find(n =>
      getNodeIdsForLinks([l], 'target').includes(n._id)
    )
    if (target === undefined) throw new Error('No target found for link')
    return { ...l, source, target, _color: theme.colorDarker }
  })
}

/**
 * Formats the graph data's nodes for display in the resource map and returns
 * a version of the grpah data with those nodes
 * @param graphData The input graph data
 * @param icons Icon data from Airtable
 * @param theme Theme data from Figma
 * @returns A version of it with nodes formatted for display
 */
function getFormattedNodes(
  graphData: network.AppGraphData,
  icons: Icon[],
  theme: any
): network.GraphNode[] {
  const showAllNodeLabels: boolean = graphData.nodes.length <= 5
  return graphData.nodes.map(n => {
    const iconName: string = n._icon !== '' ? n._icon : ''
    const icon: Icon | undefined = icons.find(
      icon => icon.data.Name === iconName
    )
    if (icon === undefined) return n
    const displayIcon = replaceFill(
      icon.data.SVG.localFiles[0].childSvg.svgString,
      n._color
    )

    return {
      ...n,
      _show: true,
      _icon: displayIcon,
      _showLabel: showAllNodeLabels,
      _color: theme.colorDarker,
    }
  })
}
