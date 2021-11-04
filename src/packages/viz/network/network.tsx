import React, { useEffect, useState } from "react";
import { emptyGraphData } from ".";
import {
  Project,
  defaultSettings,
  AppGraphData,
  demoGraphData,
  SetState,
  NetworkMap,
  Settings,
  Network2DProps,
} from "./internal";
import { ForceGraphProps } from "react-force-graph-2d";
export * from "./internal";

export type NetworkProps = Pick<Network2DProps, "zoomToFitSettings"> &
  Pick<Network2DProps, "containerStyle"> &
  ForceGraphProps & {
    /**
     * Optional: Nodes and links to show in network. Defaults to demo data.
     * Links must reference nodes that exist. Nodes have numerous properties that
     * must all have defaults assigned (see composition for details).
     */
    initGraphData?: AppGraphData;

    /**
     * Optional: ID of node that is currently hovered. Will be managed internally
     * if undefined.
     *
     * Use this property with `setHoveredNode` to customize how hovered nodes
     * are handled.
     */
    hoveredNode?: string | null;
    /**
     * Optional: Set the ID of the node that is currently hovered. Will be
     * managed internally if undefined.
     *
     * Use this property with `hoveredNode` to customize how hovered nodes
     * are handled.
     */
    setHoveredNode?: SetState<string | null>;
    /**
     * Optional: ID of node that is currently selected. Will be managed
     * internally if undefined. Right-click node to select it, right-click
     * again to deselect.
     *
     * Use this property with `setSelectedNode` to customize how selected nodes
     * are handled.
     */
    selectedNode?: string | null;

    /**
     * Optional: Set the ID of the node that is currently selected. Will be
     * managed internally if undefined. Right-click node to select it, right-
     * click again to deselect.
     *
     * Use this property with `selectedNode` to customize how selected nodes
     * are handled.
     */
    setSelectedNode?: SetState<string | null>;

    /**
     * Optional: The currently active project, i.e., collection of network maps
     * and their data sources. Defaults to a dummy project, and is only relevant
     * for network analysis applications that use input/output, etc.
     */
    activeProj?: Project;

    /**
     * NOT IMPLEMENTED: True if network should be should be rendered in 3D, false
     * for 2D.
     */
    is3D?: boolean;

    /**
     * Optional: Custom settings overriding defaults in `defaultSettings`; must
     * conform to `Settings` interface.
     */
    customSettings?: Settings;

    /**
     * Optional: Settings defining what interactions are possible. See
     * documentation for type `InteractionSettings` for more information.
     */
    interactionSettings?: InteractionSettings;
  };

export type InteractionSettings = {
  /**
   * Optional: True if panning should be allowed, defaults to true.
   */
  enablePanInteraction?: boolean;

  /**
   * Optional: True if zooming should be allowed, defaults to true.
   */
  enableZoomInteraction?: boolean;

  /**
   * Optional: Minimum zoom value possible, defaults to 0.01
   */
  minZoom?: number;
  /**
   * Optional: Maximum zoom value possible, defaults to 1000
   */
  maxZoom?: number;

  onNodeClick?: Function;
};

export function Network({
  initGraphData = demoGraphData,
  hoveredNode,
  setHoveredNode,
  selectedNode,
  setSelectedNode,
  is3D = false,
  activeProj,
  customSettings,
  interactionSettings = {
    enablePanInteraction: true,
    enableZoomInteraction: true,
    minZoom: 0.01,
    maxZoom: 1000,
  },
  ...props
}: NetworkProps) {
  const [settings] = useState({ ...defaultSettings, ...customSettings });
  const [graphData, setGraphData] = useState<AppGraphData>(initGraphData);
  const [_is3D] = useState<boolean>(is3D);
  const [_hoveredNode, _setHoveredNode] = useState<string | null>(
    hoveredNode !== undefined ? hoveredNode : null
  );
  const [_selectedNode, _setSelectedNode] = useState<string | null>(
    selectedNode !== undefined ? selectedNode : null
  );

  // create dummy project for visual interface
  // TODO implement project system
  const dummyProj: Project = new Project(
    (newGraphData) => {
      setGraphData(newGraphData);
    },
    "New project",
    settings
  );

  useEffect(() => {
    // bind internal graph data state function call
    if (activeProj !== undefined)
      activeProj.onGraphDataChange = (newGraphData) => {
        setGraphData(newGraphData);
      };
  }, [activeProj]);

  return (
    <NetworkMap
      {...props}
      activeProj={activeProj === undefined ? dummyProj : activeProj}
      // use hov/select node state handlers if defined, defaults otherwise
      {...{
        graphData,
        is3D: _is3D,
        hoveredNode: hoveredNode !== undefined ? hoveredNode : _hoveredNode,
        setHoveredNode:
          setHoveredNode !== undefined ? setHoveredNode : _setHoveredNode,
        selectedNode: selectedNode !== undefined ? selectedNode : _selectedNode,
        setSelectedNode:
          setSelectedNode !== undefined ? setSelectedNode : _setSelectedNode,
        interactionSettings,
      }}
    />
  );
}

export default Network;
