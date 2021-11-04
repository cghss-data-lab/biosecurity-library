/**
 * Display a network map.
 */

import React, { FC } from "react";
import { AppGraphData } from "./networkTypes";
import { Project } from "../classes/Project";
import { SetState } from "../types";
import Network2D, { Network2DProps } from "./Network2D/Network2D";
import styled from "styled-components";
import { defaultTheme } from "../networkThemes";
import { InteractionSettings } from "..";
import { ForceGraphProps } from "react-force-graph-2d";

const MapWindow = styled.div`
  height: 100%;
  width: 100%;
`;
type NetworkMapProps = {
  activeProj: Project;
  graphData: AppGraphData;
  is3D: boolean;
  hoveredNode: string | null;
  setHoveredNode: SetState<string | null>;
  selectedNode: string | null;
  setSelectedNode: SetState<string | null>;
  interactionSettings: InteractionSettings;
  theme?: Record<string, any>;
} & ForceGraphProps &
  Pick<Network2DProps, "zoomToFitSettings"> &
  Pick<Network2DProps, "containerStyle">;
export const NetworkMap: FC<NetworkMapProps> = ({
  activeProj,
  graphData,
  is3D,
  hoveredNode,
  setHoveredNode,
  selectedNode,
  setSelectedNode,
  interactionSettings,
  theme = defaultTheme,
  ...props
}) => {
  if (
    activeProj === undefined ||
    (graphData !== undefined && graphData.nodes.length === 0)
  )
    return <div />;
  else
    return (
      <MapWindow>
        <Network2D
          show={!is3D}
          {...{
            activeProj,
            graphData,
            hoveredNode,
            setHoveredNode,
            selectedNode,
            setSelectedNode,
            interactionSettings,
            theme,
          }}
          {...props}
        />
      </MapWindow>
    );
};
