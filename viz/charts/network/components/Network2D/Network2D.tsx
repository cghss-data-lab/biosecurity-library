import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import ForceGraph2D, {
  ForceGraphMethods,
  ForceGraphProps,
} from 'react-force-graph-2d'
import { asCircle, asHexagon, asRect, asTriangle } from './shapeHelpers'
import styled, { withTheme } from 'styled-components'
import {
  LabelPosOptions,
  AppGraphData,
  GraphLink,
  GraphNode,
  SetState,
  Project,
  SettingsContext,
  Settings,
} from '@talus-analytics/viz.charts.network-tools'
import { sortObjectsBy } from '../../utils'
import { defaultTheme } from '../../networkThemes'
import { InteractionSettings } from '../../core'

const NetworkContainer = styled.div`
  transition: opacity
    ${(props: any) =>
      props.transitionDurationSec !== undefined
        ? props.transitionDurationSec
        : 0}s
    ease-in-out;
  display: ${(props: any) => (props.show ? '' : 'none')};
  height: 100%;
  width: 100%;
`

export interface Network2DProps extends ForceGraphProps {
  show: boolean
  activeProj: Project
  graphData: AppGraphData
  hoveredNode: string | null
  setHoveredNode: SetState<string | null>
  selectedNode: string | null
  setSelectedNode: SetState<string | null>
  interactionSettings: InteractionSettings
  theme?: Record<string, any>
  zoomToFitSettings?: {
    initDelayMsec?: number
    durationMsec?: number
    paddingPx?: number
  }
  containerStyle?: Record<string, any>
}

const imgLookup: Record<string, HTMLImageElement> = {}

// Create an interface for the size of the window
interface Size {
  width: number
  height: number
}

export const Network2D: FC<Network2DProps> = ({
  activeProj,
  show,
  graphData,
  hoveredNode,
  setHoveredNode,
  selectedNode,
  setSelectedNode,
  interactionSettings,
  theme = defaultTheme,
  ...props
}) => {
  // track global scale when each frame is rendered to resize edges
  const [globalScaleState, setGlobalScaleState] = useState(1)

  // hide network container until warmup is done
  const [containerOpacity, setContainerOpacity] = useState<number>(0)

  const defaultCooldownSec: number = 5
  const [cooldownSec, setCooldownSec] = useState(
    (props.cooldownTime || defaultCooldownSec * 1000) / 1000
  )

  // The size of the window
  const [size, setSize] = useState<Size>({ width: 0, height: 0 })
  /**
   * True if graph has already been rendered and settled once
   */
  const [initialized, setInitialized] = useState<boolean>(false)

  const networkRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // This function updates the state to re-render components
  const resizeHandler = useCallback(() => {
    if (containerRef.current !== null) {
      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      })
    }
  }, [containerRef])

  // get container size
  useEffect(() => {
    if (containerRef.current !== null) {
      setSize({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      })
    }
  }, [containerRef])

  // Zoom to fit nodes
  useEffect(() => {
    if (props.zoomToFitSettings !== undefined && networkRef.current !== null) {
      if (size.width !== 0 && size.height !== 0) {
        const initDelayMsecTmp: number =
          props.zoomToFitSettings?.initDelayMsec !== undefined
            ? props.zoomToFitSettings?.initDelayMsec
            : (cooldownSec / 2) * 1000
        const initDelayMsec: number = initialized ? 0 : initDelayMsecTmp
        if (initDelayMsec > 0) setContainerOpacity(1)
        setTimeout(() => {
          if (networkRef.current === null) return
          const durationMsec: number =
            props.zoomToFitSettings?.durationMsec !== undefined
              ? props.zoomToFitSettings?.durationMsec
              : 1000
          const paddingPx: number =
            props.zoomToFitSettings?.paddingPx !== undefined
              ? props.zoomToFitSettings?.paddingPx
              : 40
          networkRef.current.zoomToFit(durationMsec, paddingPx)
          if (!initialized) setInitialized(true)
        }, initDelayMsec)
      }
    } else {
      if (!initialized) setInitialized(true)
    }
  }, [cooldownSec, initialized, props.zoomToFitSettings, size])

  useEffect(() => {
    if (initialized && containerOpacity !== 1) setContainerOpacity(1)
  }, [containerOpacity, initialized])

  // Listening for the window resize event
  useEffect(() => {
    if (typeof window !== undefined)
      window.addEventListener('resize', resizeHandler)
    return () => {
      if (typeof window !== undefined)
        window.removeEventListener('resize', resizeHandler)
    }
  }, [resizeHandler])

  // shape rendering parameters
  // TODO types
  const params: any = useMemo(() => {
    return {
      nodeColor: (n: any) =>
        n !== undefined && n._color !== undefined ? n._color : '#0D2449',
    }
  }, [])

  // update network map if settings are changed
  const settings: Settings = useContext(SettingsContext)

  useEffect(() => {
    if (networkRef.current !== null) {
      if (settings.network.paused) {
        setCooldownSec(0)
        graphData.nodes.forEach((n: any) => {
          n.fx = n.x
          n.fy = n.y
        })
      } else {
        if (cooldownSec !== defaultCooldownSec)
          setCooldownSec(defaultCooldownSec)
        const methods: ForceGraphMethods = networkRef.current
        methods.d3ReheatSimulation()
      }
    }
  }, [cooldownSec, graphData.nodes, settings.network.paused])

  useEffect(() => {
    if (networkRef.current !== null) {
      unanchorNodes(graphData)
    }
    // eslint-disable-next-line
  }, [getLinkHash(graphData.links)])

  useEffect(() => {
    activeProj.selectedNode = selectedNode
    activeProj.dataSources.forEach(ds => ds.onNodeConfigUpdate())
  }, [activeProj, selectedNode])

  /**
   * Sets the hovered node equal to the provided node's ID.
   * @param n Node information
   */
  const highlightHoveredNode = useCallback(
    (n: any) => {
      if (n !== null) setHoveredNode(n._id)
      else setHoveredNode(null)
    },
    [setHoveredNode]
  )

  /**
   * Sets the clicked node equal to the provided node's ID.
   * @param n Node information
   */
  const selectClickedNode = useCallback(
    (n: any) => {
      if (n !== null && n._id !== selectedNode) setSelectedNode(n._id)
      else setSelectedNode(null)
    },
    [selectedNode, setSelectedNode]
  )

  const getLinkColor = useCallback(
    (linkInfo: any) => {
      const hoveredNodeIsPrimary: boolean =
        linkInfo.source._id === hoveredNode ||
        linkInfo.target._id === hoveredNode
      if (hoveredNode !== null && !hoveredNodeIsPrimary) return '#C9C9C920'
      if (linkInfo.color !== undefined) return linkInfo.color
      if (!settings.edges.showEdges) {
        return '#00000000'
      } else return '#C9C9C9'
    },
    [hoveredNode, settings.edges.showEdges]
  )

  const getHoveredNodePrimaryLinkNodes = useCallback(() => {
    const primaryLinks: any[] = graphData.links.filter(linkInfo => {
      const isStruct: boolean = (linkInfo.source as GraphNode)._id !== undefined
      if (isStruct)
        return (
          (linkInfo.source as GraphNode)._id === hoveredNode ||
          (linkInfo.target as GraphNode)._id === hoveredNode
        )
      else
        return (
          linkInfo.source === hoveredNode || linkInfo.target === hoveredNode
        )
    })
    return [
      ...new Set(
        primaryLinks
          .map(linkInfo => [linkInfo.source._id, linkInfo.target._id])
          .flat()
      ),
    ]
  }, [graphData.links, hoveredNode])

  type CanvasFunction = (
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => void

  /**
   * Add node labels after each frame is rendered.
   * @param ctx The canvas context
   * @param globalScale The global scale
   */
  const addNodeLabels: CanvasFunction = useCallback(
    (ctx, globalScale): void => {
      graphData.nodes.forEach(node => {
        const isSelectedNode: boolean = selectedNode === node._id
        if (node._showLabel || node._shape === 'tri' || isSelectedNode) {
          const text = node._label || 'Node'
          const fontSize =
            (node._fontSize || settings.nodes.fontSize) / globalScale
          if (node._labelFont !== undefined) {
            ctx.font = node._labelFont
          } else if (node._labelFontWeight !== undefined) {
            ctx.font = `${node._labelFontWeight} ${fontSize}px 'Open Sans'`
          } else ctx.font = `${fontSize}px 'Open Sans'`
          ctx.textAlign = 'center'
          const nodeLabelPos: LabelPosOptions =
            node._labelPos || settings.nodes.labelPos
          ctx.textBaseline = nodeLabelPos === 'center' ? 'middle' : 'top'
          ctx.fillStyle = node._labelColor || theme.colors.text

          // dim labels whose nodes are dimmed
          const notHoveredNode =
            hoveredNode !== null &&
            hoveredNode !== node._id &&
            !getHoveredNodePrimaryLinkNodes().includes(node._id)
          // const dimLabel = hoveredNode !== null && node._id !== hoveredNode
          ctx.save()
          if (notHoveredNode) ctx.globalAlpha = 0.2

          // add half of icon height including global scale to text y pos
          const iconHeight: number = 5 // DEBUG
          const scaledIconHeight: number = iconHeight * 1
          const gap: number = 1
          const textYOffset: number =
            nodeLabelPos === 'center' ? 0 : scaledIconHeight + gap
          const textY: number =
            (node.y || 0) + textYOffset + (node._labelYOffset || 0)
          drawTextLabel(ctx, text, node, textY, fontSize, nodeLabelPos)
          ctx.restore()
        }
      })
    },
    [
      graphData.nodes,
      hoveredNode,
      selectedNode,
      settings.nodes.fontSize,
      settings.nodes.labelPos,
      theme.colors.text,
      getHoveredNodePrimaryLinkNodes,
    ]
  )

  const getNodeCanvasObject = useCallback(
    (
      node: any,
      ctx: CanvasRenderingContext2D
      // globalScale: number
    ) => {
      const color: string = params.nodeColor(node)

      const notHoveredNode =
        hoveredNode !== null &&
        hoveredNode !== node._id &&
        !getHoveredNodePrimaryLinkNodes().includes(node._id)

      const isSelectedNode: boolean = selectedNode === node._id
      const [currentNodeColor, curNodeColorNoAlpha]: [string, string] =
        getCurrentNodeColor(
          { hovered: !notHoveredNode, selected: isSelectedNode },
          color,
          settings
        )

      const usingImg: boolean =
        node._icon !== undefined && node._icon.startsWith('<svg')

      // add white circle frame to icons
      if (usingImg) {
        ctx.fillStyle = node._backgroundColor || '#ffffff'
        switch (node._backgroundShape) {
          case 'hexagon':
            asHexagon(
              {
                ...node,
                _size:
                  node._size *
                  (node._backgroundSize !== undefined
                    ? node._backgroundSize
                    : 1),
              },
              ctx
            )
            break
          default:
            asCircle(
              {
                ...node,
                _size:
                  node._size *
                  (node._backgroundSize !== undefined
                    ? node._backgroundSize
                    : 1),
              },
              ctx
            )
        }
      }
      ctx.fillStyle = currentNodeColor

      if (usingImg) {
        const imgSrc =
          'data:image/svg+xml;charset=utf-8,' +
          encodeURIComponent(replaceFill(node._icon, curNodeColorNoAlpha))
        let img: HTMLImageElement | undefined = undefined
        if (imgLookup[imgSrc] === undefined) {
          const newImg = new Image()
          newImg.src = imgSrc
          imgLookup[imgSrc] = newImg
          img = newImg
        } else {
          img = imgLookup[imgSrc]
        }
        if (img === undefined)
          throw new Error('Missing image source for node ID ' + node._id)

        ctx.save()
        ctx.globalAlpha = notHoveredNode ? 0.2 : 1.0
        const ICON_SCALE_FACTOR: number = 0.4
        const iconWidth = img.width * ICON_SCALE_FACTOR
        const iconHeight = img.height * ICON_SCALE_FACTOR
        ctx.drawImage(
          img,
          node.x - iconWidth / 2, // paste to...
          node.y - iconHeight / 2,
          iconWidth,
          iconHeight
        )
        ctx.restore()
      }

      if (!usingImg) {
        if (node._shape === 'square') asRect(node, color, ctx)
        else if (node._shape === 'tri') asTriangle(node, color, ctx)
        else asCircle(node, ctx)
      }
    },
    [
      getHoveredNodePrimaryLinkNodes,
      hoveredNode,
      params,
      selectedNode,
      settings,
    ]
  )

  const onRenderFramePre = useCallback(
    (ctx: CanvasRenderingContext2D, globalScale: number): void => {
      if (props.onRenderFramePre !== undefined)
        props.onRenderFramePre(ctx, globalScale)
      setGlobalScaleState(globalScale)
    },
    [props]
  )
  const onRenderFramePost = useCallback(
    (ctx: CanvasRenderingContext2D, globalScale: number): void => {
      if (props.onRenderFramePost !== undefined)
        props.onRenderFramePost(ctx, globalScale)
      addNodeLabels(ctx, globalScale)
    },
    [addNodeLabels, props]
  )
  const getLinkWidth = useCallback(
    (a: any) => {
      return settings.edges.edgeWidth * a.value * globalScaleState
    },
    [globalScaleState, settings.edges.edgeWidth]
  )
  const onNodeDrag = useCallback(() => {
    unanchorNodes(graphData)
  }, [graphData])
  // JSX
  return (
    <NetworkContainer
      style={{ opacity: containerOpacity, ...(props.containerStyle || {}) }}
      ref={containerRef}
      {...{ show }}
    >
      <ForceGraph2D
        ref={networkRef}
        width={size.width}
        height={size.height !== 0 ? size.height : undefined}
        cooldownTime={cooldownSec * 1000}
        onNodeDrag={onNodeDrag}
        nodeVisibility={(n: GraphNode) => {
          return n._show
        }}
        linkDirectionalArrowLength={5}
        linkCurvature={0.5}
        linkCurveRotation={0}
        linkColor={getLinkColor}
        linkWidth={getLinkWidth}
        nodeLabel={'_label'}
        nodeId={'_id'}
        onNodeHover={highlightHoveredNode}
        onNodeRightClick={selectClickedNode}
        nodeCanvasObject={getNodeCanvasObject}
        {...props}
        onRenderFramePre={onRenderFramePre}
        onRenderFramePost={onRenderFramePost}
        {...{
          graphData: useMemo(() => {
            return {
              nodes: graphData.nodes,
              links: graphData.links,
            }
          }, [graphData]),
          ...params,
          ...interactionSettings,
        }}
      />
    </NetworkContainer>
  )
}

/**
 * Renders a text label for the give node.
 * @param ctx Canvas context
 * @param text Label text
 * @param node Node object with properties
 * @param textY Vertical text label offset
 * @param fontSize Font size in pixels
 * @param approxWordsPerLine Approx. number of words for each line, or Infinity
 */
function drawTextLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  node: GraphNode,
  textY: number,
  fontSize: number,
  labelPos: LabelPosOptions,
  approxWordsPerLine: number = 3
) {
  if (approxWordsPerLine === Infinity) ctx.fillText(text, node.x || 0, textY)
  else {
    let toDraw: { text: string; x: number; y: number }[] = []
    const words: string[] = text.split(' ')
    let lineNum: number = 0
    while (words.length > 0) {
      const curWords: string[] = words.splice(0, approxWordsPerLine)
      const oneWordLeft: boolean = words.length === 1
      if (oneWordLeft) curWords.push(words.pop() || '')
      toDraw.push({
        text: curWords.join(' '),
        x: node.x || 0,
        y: textY + fontSize * (lineNum + 0) * 1.2,
      })

      lineNum += 1
    }
    if (labelPos === 'center') {
      const spaceAdded: number = fontSize * (lineNum - 1) * 1.2
      toDraw = toDraw.map(d => {
        return { ...d, y: d.y - spaceAdded / 2 }
      })
    }
    toDraw.forEach(({ text, x, y }) => {
      ctx.fillText(text, x, y)
    })
  }
}

/**
 * Given the node's current state, returns the color it should be in the
 * current rendering of the network. Accounts for default node color and
 * current global settings.
 *
 * @param nodeState The node state, e.g., hovered, selected
 * @param color The default color
 * @param settings The current global settings
 * @returns The color (first element) and a version of it without alpha (the
 * second element)
 */
function getCurrentNodeColor(
  nodeState: { hovered: boolean; selected: boolean },
  color: string,
  settings: Settings
): [string, string] {
  if (!nodeState.hovered) return [color + '20', color]
  if (nodeState.selected)
    return [settings.nodes.selectedColor, settings.nodes.selectedColor]
  return [color, color]
}

function unanchorNodes(graphData: AppGraphData) {
  graphData.nodes.forEach((n: any) => {
    n.fx = undefined
    n.fy = undefined
  })
}

/**
 * Create unique hash string representing the links. Used to trigger network
 * map reheat if links are changed.
 * @param links The links
 * @returns A unique has
 */
const getLinkHash = (links: GraphLink[]): string => {
  const hash: string = links
    .sort(sortObjectsBy('value'))
    .sort(sortObjectsBy('target'))
    .sort(sortObjectsBy('source'))
    .map(l => {
      if ((l.source as GraphNode)._id !== undefined)
        return `${(l.source as GraphNode)._id}__${
          (l.target as GraphNode)._id
        }__${l.value}`
      return `${l.source}__${l.target}__${l.value}`
    })
    .join('_')
  return hash
}

// replace the fill and stroke colors on all child
// elements of the SVG; but only if those elements
// already have a fill or stroke set.
export function replaceFill(svg: string, color: string): string {
  // TODO refactor function
  // this uses node-html-parser instead of native DOM
  // so that it will support server-side-rendering.
  if (!svg.startsWith('<svg')) {
    throw new Error(
      "The string `svg` doesn't appear to be an svg," +
        ' please check and try again.'
    )
  }

  const svgDom = new DOMParser().parseFromString(svg, 'image/svg+xml')
  const svgElement = svgDom.querySelector('svg')!
  const children = svgElement.childNodes
  for (let child of children) {
    // note this is the node-html-parser implementation
    // of the HTMLElement class, not a native HTMLElement
    if (child instanceof SVGElement) {
      if (child.hasAttribute('fill')) child.setAttribute('fill', color)
      if (child.hasAttribute('stroke')) child.setAttribute('stroke', color)
    }
  }
  return svgElement.outerHTML
}

export default withTheme(Network2D)
