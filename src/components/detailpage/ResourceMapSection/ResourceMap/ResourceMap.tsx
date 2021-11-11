/**
 * Resource map showing links between resources related to each other.
 *
 * TODO fix icon flicker
 * TODO allow edge color to be set dynamically
 * TODO allow max words in label lines to be controlled
 */

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { graphql, navigate, useStaticQuery } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import { LinkObject } from 'react-force-graph-2d'
import { renderToString } from 'react-dom/server'

import {
  IconsQueryMap,
  replaceFill,
} from '../../../../airtable-cms/AirtableCMSIcon'
import * as network from '../../../../bit/viz/charts/network'
// import * as network from '@talus-analytics/viz.charts.network'
import {
  AppGraphData,
  getNodeIdsForLinks,
  GraphLink,
  GraphNode,
} from '@talus-analytics/viz.charts.network/dist/helpers'
import Legend from './Legend/Legend'
import CurvedEdgeEntry from './Legend/CurvedEdgeEntry'
import IconEntries, { IconEntry } from './Legend/IconEntries'
import { PageContext } from '../../../../templates/Detail'
import WrappedLabel from './Legend/WrappedLabel'
import getCanvasPixelsXMin from './helpers/getCanvasPixelsXMin'

/**
 * Icon data from Airtable
 */
export type Icon = {
  data: { Name: string; Text: string; SVG: any }
}

const Section = styled.section`
  display: flex;
`
const MapContainer = styled.div`
  z-index: 0;
  position: relative;
  width: 100%;
  height: 500px;
`

const NodeHoverLabelBox = styled.div`
  z-index: 2;
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.colorDarker};
  border-radius: 5px;
  color: ${({ theme }) => theme.colorDarker};
  background-color: #ffffff;
  margin: -5px;
  padding: 0.25em 0.5em;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.33em;
`

/**
 * Display interactive resource map with provided graph data (nodes and links)
 *
 * @param selectedNode
 * Optional: The data of the selected node, which may be
 * styled differently than the others, etc.
 *
 * @param graphData
 * Optional: The nodes and links. No map shown if undefined.
 *
 * @param curvedlinks
 * Optional: True if curved links should be drawn, false if
 * straight; defaults to true.
 *
 * @returns Resource map
 */
export const ResourceMap: React.FC<{
  selectedNode?: PageContext['data']
  graphData?: AppGraphData
  curvedLinks?: boolean
}> = ({ selectedNode, graphData, curvedLinks = true }) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [mapLeftMargin, setMapLeftMargin] = useState<number>(0)
  const [positioned, setPositioned] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const iconsQueryMapRes = useStaticQuery<IconsQueryMap>(graphql`
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
  const icons = iconsQueryMapRes?.iconsQueryMap.nodes || []

  const theme: any = useTheme()
  const formattedGraphData: AppGraphData | undefined = useMemo(
    () =>
      formatGraphData(
        graphData,
        icons,
        theme,
        graphData?.nodes.find(n => n._id === selectedNode?.Record_ID_INTERNAL)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [graphData, icons, theme]
    // [graphData, icons, selectedNode, theme]
  )

  const selectedNodeId: string | undefined = selectedNode?.Record_ID_INTERNAL

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
      return (l.source as GraphNode)._id === hoveredNode ||
        (l.target as GraphNode)._id === hoveredNode
        ? 5
        : 0
    },
    [hoveredNode]
  )

  const updateCanvasLeftMargin = useCallback(() => {
    if (ref.current !== null && !positioned) {
      const c: HTMLCanvasElement | null = ref.current.querySelector('canvas')
      if (c !== null) {
        const xMin: number = getCanvasPixelsXMin(c)
        if (xMin !== Infinity) {
          const newLeftMargin: number = -1 * xMin + 100
          if (newLeftMargin === mapLeftMargin) setPositioned(true)
          setMapLeftMargin(newLeftMargin)
        }
      }
    }
  }, [mapLeftMargin, positioned])

  const showAllNodeLabels: boolean =
    graphData !== undefined && graphData.nodes.length <= 5
  const hideTipForLabeledNodes = useCallback(
    (n: any) => {
      if (showAllNodeLabels) return ''
      const isSelectedNode: boolean =
        selectedNode !== undefined && selectedNode.Record_ID_INTERNAL === n._id

      const label = renderToString(
        <NodeHoverLabelBox {...{ theme }}>
          <WrappedLabel>{n._label}</WrappedLabel>
        </NodeHoverLabelBox>
      )
      return !isSelectedNode ? label : ''
    },
    [selectedNode, showAllNodeLabels, theme]
  )

  // return null if no map to show
  if (graphData === undefined) return <div>Wow</div>
  // // return null if no map to show
  // if (
  //   graphData === undefined ||
  //   graphData.nodes.length === 0 ||
  //   graphData.links.length === 0
  // )
  //   return null

  const citationDesc: string = getCitationCountText(selectedNodeId, graphData)

  return (
    <section>
      <p>{citationDesc}</p>
      <em>Click resource in map to go to page</em>
      <Section>
        <Legend>
          <h6>Legend</h6>
          {/* Resource type icons legend */}
          {selectedNode !== undefined && (
            <IconEntry
              label={'This resource'}
              value={selectedNode.Resource_type}
              frameColor={theme.colorYellow}
              frameShape={'hexagon'}
            />
          )}
          <IconEntries
            icons={icons.filter(icon => {
              return graphData?.nodes.map(n => n._icon).includes(icon.data.Name)
            })}
          />
          {/* Link direction legend */}
          {curvedLinks && (
            <CurvedEdgeEntry nodeColor={theme?.colorDarker || 'skyblue'} />
          )}
        </Legend>
        <MapContainer
          data-network
          style={{ marginLeft: mapLeftMargin }}
          {...{ ref }}
        >
          <network.SettingsContext.Provider
            value={{
              ...network.defaultSettings,
              nodes: {
                ...network.defaultSettings.nodes,
                selectedColor: theme.colorDarker,
              },
            }}
          >
            <network.Network
              enableNodeDrag={false}
              onRenderFramePost={updateCanvasLeftMargin}
              nodeLabel={hideTipForLabeledNodes}
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
              initGraphData={formattedGraphData}
              {...{
                hoveredNode,
                setHoveredNode,
                selectedNode: selectedNode?.Record_ID_INTERNAL,
              }}
            />
          </network.SettingsContext.Provider>
        </MapContainer>
      </Section>
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
  graphData: AppGraphData
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
 *
 * @param field The field (target or source) for which to count unique node IDs
 *
 * @param selectedNodeId
 * The ID of the node whose incoming and outgoing connections are
 * to be counted
 *
 * @returns The count
 */
function getUniqueNodeIdCount(
  graphData: AppGraphData,
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
 *
 * @param graphData The input graph data
 *
 * @param icons Icon SVG data from Airtable
 *
 * @param theme Theme from Figma
 *
 * @param selectedNode
 * Optional: The selected node, if any, which is
 * styled differently.
 *
 * @returns The graph data formatted for display in the resource map
 */
function formatGraphData(
  graphData: AppGraphData = { nodes: [], links: [] },
  icons: Icon[],
  theme: any = {},
  selectedNode?: GraphNode
): AppGraphData | undefined {
  const formattedNodes: GraphNode[] = getFormattedNodes(
    graphData,
    icons,
    theme,
    selectedNode
  )
  const formattedLinks: GraphLink[] = getFormattedLinks(
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
 *
 * @param graphData The input graph data
 *
 * @param formattedNodes The formatted nodes
 *
 * @param theme Theme data from Figma
 *
 * @returns A version of it with links formatted for display
 */
function getFormattedLinks(
  graphData: AppGraphData,
  formattedNodes: GraphNode[],
  theme: any = {}
): GraphLink[] {
  return graphData.links.map(l => {
    const source = formattedNodes.find(n =>
      getNodeIdsForLinks([l], 'source').includes(n._id)
    )
    if (source === undefined) throw new Error('No source found for link')
    const target = formattedNodes.find(n =>
      getNodeIdsForLinks([l], 'target').includes(n._id)
    )
    if (target === undefined) throw new Error('No target found for link')
    return { ...l, source, target, _color: theme.colorDarker, value: 1 }
  })
}

/**
 * Formats the graph data's nodes for display in the resource map and returns
 * a version of the grpah data with those nodes
 *
 * @param graphData The input graph data
 *
 * @param icons Icon data from Airtable
 *
 * @param theme Theme data from Figma
 *
 * @param selectedNode
 * Optional: The selected node, if any, which is
 * styled differently.
 *
 * @returns A version of it with nodes formatted for display
 */
function getFormattedNodes(
  graphData: AppGraphData,
  icons: Icon[],
  theme: any = {},
  selectedNode: GraphNode | undefined
): GraphNode[] {
  const showAllNodeLabels: boolean = graphData.nodes.length <= 5
  return graphData.nodes.map(n => {
    // const n: GraphNode  = initResourceMapNode(selectedNodeData)
    const isSelectedNode: boolean =
      selectedNode !== undefined && selectedNode._id === n._id
    const iconName: string =
      n._icon !== '' && n._icon !== undefined ? n._icon : ''
    const icon: Icon | undefined = icons.find(
      icon => icon.data.Name === iconName
    )
    if (icon === undefined) return n
    const displayIcon = replaceFill(
      icon.data.SVG.localFiles[0].childSvg.svgString,
      n._color || theme.colorDarker
    )

    const updatedN: GraphNode = {
      ...n,
      _show: true,
      _icon: displayIcon,
      _showLabel: showAllNodeLabels || isSelectedNode,
      _color: theme.colorDarker,
      _backgroundColor: theme.colorVeryLightGray,
      _labelColor: undefined,
      _labelFont: undefined,
      _labelYOffset: 1,
      _labelFontWeight: '600',
      _shape: 'circle',
      _nodeType: 'default',
      _fontSize: 16,
      _labelPos: 'bottom',
      _size: 1,
    }
    if (isSelectedNode)
      return {
        ...updatedN,
        _labelYOffset: 5,
        _backgroundColor: theme.colorYellow,
        _backgroundShape: 'hexagon',
        _backgroundSize: 9,
      }
    else return updatedN
  })
}
