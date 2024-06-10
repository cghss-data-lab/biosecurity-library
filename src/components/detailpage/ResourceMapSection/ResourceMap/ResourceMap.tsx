/**
 * Resource map showing links between resources related to each other.
 *
 * TODO fix icon flicker
 * TODO allow edge color to be set dynamically
 * TODO allow max words in label lines to be controlled
 */

import React, { useCallback, useMemo, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import styled, { useTheme } from 'styled-components'
import { LinkObject } from 'react-force-graph-2d'
import { renderToString } from 'react-dom/server'

import { useAllCMSIcons, replaceFill } from 'airtable-cms/CMSIcon'

import * as network from '@talus-analytics/viz.charts.network'
import {
  SettingsContext,
  defaultSettings,
} from '@talus-analytics/viz.charts.network-tools'
import {
  AppGraphData,
  getNodeIdsForLinks,
  GraphLink,
  GraphNode,
} from '@talus-analytics/viz.charts.network-tools'

import { PageContext } from '../../../../templates/Detail'
import WrappedLabel from './Legend/WrappedLabel'
import parse from 'node-html-parser'

/**
 * Icon data from Airtable
 */
export type Icon = { name: string; text: string; svg: any }

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
  const ref = useRef<HTMLDivElement>(null)
  const icons = useAllCMSIcons()

  const theme: any = useTheme()
  const formattedGraphData: AppGraphData | undefined = useMemo(
    () =>
      formatGraphData(
        graphData,
        icons,
        theme,
        graphData?.nodes.find(n => n._id === selectedNode?.Record_ID_INTERNAL)
      ),
    [graphData, icons, selectedNode?.Record_ID_INTERNAL, theme]
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

  // /**
  //  * Ensure constant gap between main canvas and legend component.
  //  */
  // const updateCanvasLeftMargin = useCallback(() => {
  //   if (ref.current !== null && !positioned) {
  //     const c: HTMLCanvasElement | null = ref.current.querySelector('canvas')
  //     if (c !== null) {
  //       const xMin: number = getCanvasPixelsXMin(c)
  //       if (xMin === Infinity) return
  //       console.log('curXMin = ' + curXMin)
  //       console.log('xMin = ' + xMin)
  //       if (curXMin > xMin) setCurXMin(xMin)
  //       else if (xMin !== Infinity) {
  //         const newLeftMargin: number = -1 * xMin + 100
  //         if (newLeftMargin === mapLeftMargin) setPositioned(true)
  //         console.log('newLeftMargin = ' + newLeftMargin)

  //         setMapLeftMargin(newLeftMargin)
  //       }
  //     }
  //   }
  // }, [mapLeftMargin, positioned, curXMin])

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

  return (
    <MapContainer
      data-network
      // style={{ marginLeft: mapLeftMargin }}
      {...{ ref }}
    >
      <SettingsContext.Provider
        value={{
          ...defaultSettings,
          nodes: {
            ...defaultSettings.nodes,
            selectedColor: theme.colorDarker,
          },
        }}
      >
        <network.Network
          key={selectedNode?.Record_ID_INTERNAL}
          enableNodeDrag={false}
          // onRenderFramePost={updateCanvasLeftMargin}
          nodeLabel={hideTipForLabeledNodes}
          containerStyle={{ transition: 'opacity .25s ease-in-out' }}
          linkDirectionalArrowLength={getLinkDirectionalArrowLength}
          linkCurvature={curvedLinks ? 0.5 : 0}
          warmupTicks={5000}
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
      </SettingsContext.Provider>
    </MapContainer>
  )
}

export default ResourceMap

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
    const icon: Icon | undefined = icons.find(icon => icon.name === iconName)
    if (icon === undefined) return n
    const displayIcon = replaceFill(
      parse(icon.svg.toString()),
      n._color || theme.colorDarker
    )

    const updatedN: GraphNode = {
      ...n,
      _show: true,
      _icon: displayIcon.toString(),
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
