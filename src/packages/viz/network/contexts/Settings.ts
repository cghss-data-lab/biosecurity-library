import React from "react";
import { Themes } from "../internal";

export const labelPosOptionNames = ["center", "bottom"] as const;

export type LabelPosOptions = typeof labelPosOptionNames[number];

export interface Settings {
  theme: Themes;
  nodes: {
    showNodeLabels: boolean;
    selectedColor: string;
    allowedNeighborDepth: 1 | 2 | 3;
    fontSize: number;
    labelPos: LabelPosOptions;
  };
  edges: {
    showEdges: boolean;
    edgeWidth: number;
  };
  network: {
    paused: boolean;
  };
}
export const defaultSettings: Settings = {
  theme: "light",
  nodes: {
    showNodeLabels: true,
    selectedColor: "#F6D356",
    allowedNeighborDepth: 1,
    fontSize: 9.5,
    labelPos: "bottom",
  },
  edges: {
    showEdges: true,
    edgeWidth: 0.5,
  },
  network: {
    paused: false,
  },
};

export const SettingsContext = React.createContext<Settings>(defaultSettings);
