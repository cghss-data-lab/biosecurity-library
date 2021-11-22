import React, { useEffect, useState } from 'react'
import { demoGraphData } from './internal/internal'
import { NetworkMap, NetworkProps } from './core'
import {
  Project,
  defaultSettings,
  AppGraphData,
} from '@talus-analytics/viz.charts.network-tools'

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
  const [settings] = useState({ ...defaultSettings, ...customSettings })
  const [graphData, setGraphData] = useState<AppGraphData>(initGraphData)
  const [_is3D] = useState<boolean>(is3D)
  const [_hoveredNode, _setHoveredNode] = useState<string | null>(
    hoveredNode !== undefined ? hoveredNode : null
  )
  const [_selectedNode, _setSelectedNode] = useState<string | null>(
    selectedNode !== undefined ? selectedNode : null
  )

  // create dummy project for visual interface
  const dummyProj: Project = new Project(
    newGraphData => {
      setGraphData(newGraphData)
    },
    'New project',
    settings
  )

  useEffect(() => {
    // bind internal graph data state function call
    if (activeProj !== undefined)
      activeProj.onGraphDataChange = newGraphData => {
        setGraphData(newGraphData)
      }
  }, [activeProj])

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
  )
}

export default Network