/**
 * Resource map showing links between resources that depend on each other.
 * TODO don't break when tabs changed to and then back to its tab
 * TODO allow curved/straight edges to be toggled
 * TODO allow edge color to be set dynamically
 * TODO faster rendering (shorten cooldown so "zoom" happens sooner)
 * TODO click node to go to resource page
 * TODO legend defining edges and resource types
 * TODO allow max words in label lines to be controlled
 * TODO don't make hovered labels reflow when they're longer than container
 */

import React from 'react'

import {
  IconsQueryMap,
  replaceFill,
} from '../../../airtable-cms/AirtableCMSIcon'
import * as network from '@mvanmaele/mvanmaele-test.viz.network'
import { graphql, useStaticQuery } from 'gatsby'
import styled from 'styled-components'
type Icon = {
  data: { Name: string; Text: string; SVG: any }
}

const CONTAINER_SIZE: number = 500
const Container = styled.div`
  width: ${CONTAINER_SIZE}px;
  height: ${CONTAINER_SIZE}px;
`

/**
 * Display interactive resource map with provided graph data (nodes and links)
 * @returns Resource map
 */
export const ResourceMap: React.FC<{
  selectedNodeId?: string
  graphData?: network.AppGraphData
}> = ({ selectedNodeId, graphData, children }) => {
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
  if (
    graphData === undefined ||
    graphData.nodes.length === 0 ||
    graphData.links.length === 0
  )
    return null
  const cites: number = getUniqueNodeIdCount(
    graphData,
    'target',
    selectedNodeId
  )
  const citedBy: number = getUniqueNodeIdCount(
    graphData,
    'source',
    selectedNodeId
  )
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
  return (
    <p>
      <p>{text}</p>
      <em>Click resource in map to go to page</em>
      <Container>
        <network.Network
          interactionSettings={{
            enableZoomInteraction: false,
            enablePanInteraction: false,
            maxZoom: 5,
          }}
          selectedNode={selectedNodeId}
          initGraphData={formatGraphData(graphData, icons)}
        />
      </Container>
    </p>
  )
}

export default ResourceMap

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
 * @returns The graph data formatted for display in the resource map
 */
function formatGraphData(
  graphData: network.AppGraphData,
  icons: Icon[]
): network.AppGraphData | undefined {
  return {
    nodes: formatNodes(graphData, icons),
    links: graphData.links,
  }
}

/**
 * Formats the graph data's nodes for display in the resource map and returns
 * a version of the grpah data with those nodes
 * @param graphData The input graph data
 * @returns A version of it with nodes formatted for display
 */
function formatNodes(
  graphData: network.AppGraphData,
  icons: Icon[]
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
    }
  })
}
