// Exports all components directly relevant to DOM manipulation
import { ForceGraphProps } from 'react-force-graph-2d'
import { Network2DProps } from '..'
import { AppGraphData, SetState, Project, Settings } from '../../network-tools'
export * from '../components/Network2D/Network2D'
export { NetworkMap } from '../components/NetworkMap'
export type NetworkProps = Pick<Network2DProps, 'zoomToFitSettings'> &
  Pick<Network2DProps, 'containerStyle'> &
  ForceGraphProps & {
    /**
     * Optional: Nodes and links to show in network. Defaults to demo data.
     * Links must reference nodes that exist. Nodes have numerous properties that
     * must all have defaults assigned (see composition for details).
     */
    initGraphData?: AppGraphData

    /**
     * Optional: ID of node that is currently hovered. Will be managed internally
     * if undefined.
     *
     * Use this property with `setHoveredNode` to customize how hovered nodes
     * are handled.
     */
    hoveredNode?: string | null
    /**
     * Optional: Set the ID of the node that is currently hovered. Will be
     * managed internally if undefined.
     *
     * Use this property with `hoveredNode` to customize how hovered nodes
     * are handled.
     */
    setHoveredNode?: SetState<string | null>
    /**
     * Optional: ID of node that is currently selected. Will be managed
     * internally if undefined. Right-click node to select it, right-click
     * again to deselect.
     *
     * Use this property with `setSelectedNode` to customize how selected nodes
     * are handled.
     */
    selectedNode?: string | null

    /**
     * Optional: Set the ID of the node that is currently selected. Will be
     * managed internally if undefined. Right-click node to select it, right-
     * click again to deselect.
     *
     * Use this property with `selectedNode` to customize how selected nodes
     * are handled.
     */
    setSelectedNode?: SetState<string | null>

    /**
     * Optional: The currently active project, i.e., collection of network maps
     * and their data sources. Defaults to a dummy project, and is only relevant
     * for network analysis applications that use input/output, etc.
     */
    activeProj?: Project

    /**
     * NOT IMPLEMENTED: True if network should be should be rendered in 3D, false
     * for 2D.
     */
    is3D?: boolean

    /**
     * Optional: Custom settings overriding defaults in `defaultSettings`; must
     * conform to `Settings` interface.
     */
    customSettings?: Settings

    /**
     * Optional: Settings defining what interactions are possible. See
     * documentation for type `InteractionSettings` for more information.
     */
    interactionSettings?: InteractionSettings
  }

export type InteractionSettings = {
  /**
   * Optional: True if panning should be allowed, defaults to true.
   */
  enablePanInteraction?: boolean

  /**
   * Optional: True if zooming should be allowed, defaults to true.
   */
  enableZoomInteraction?: boolean

  /**
   * Optional: Minimum zoom value possible, defaults to 0.01
   */
  minZoom?: number
  /**
   * Optional: Maximum zoom value possible, defaults to 1000
   */
  maxZoom?: number

  onNodeClick?: Function
}
