import React from 'react'
import {
  LabelPosOptions,
  NodeConfig,
  NodeShape,
  Themes,
} from '@talus-analytics/viz.charts.network-tools'

export interface Settings {
  theme: Themes
  nodes: {
    showNodeLabels: boolean
    selectedColor: string
    allowedNeighborDepth: 1 | 2 | 3
    fontSize: number
    labelPos: LabelPosOptions
  }
  edges: {
    showEdges: boolean
    edgeWidth: number
  }
  network: {
    paused: boolean
  }
}
export const defaultSettings: Settings = {
  theme: 'light',
  nodes: {
    showNodeLabels: true,
    selectedColor: '#F6D356',
    allowedNeighborDepth: 1,
    fontSize: 9.5,
    labelPos: 'bottom',
  },
  edges: {
    showEdges: true,
    edgeWidth: 0.5,
  },
  network: {
    paused: false,
  },
}

export const defaultNodeDef: NodeConfig = {
  idFieldName: 'id',
  labelByField: 'label',
  colorByField: 'color',
  iconByField: 'icon',
  shape: NodeShape.circle,
  hideUnlinked: false,
  hideUnselected: true,
  showLabels: defaultSettings.nodes.showNodeLabels,
  labelPos: defaultSettings.nodes.labelPos,
  fontSize: defaultSettings.nodes.fontSize,
  size: 1,
}

export const SettingsContext = React.createContext<Settings>(defaultSettings)
