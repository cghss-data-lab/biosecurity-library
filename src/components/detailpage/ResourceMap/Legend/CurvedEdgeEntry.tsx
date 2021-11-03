/**
 * Simple legend defining the direction of curved edges in `<ResourceMap />`
 */
import React, { useMemo } from 'react'
import * as network from '@mvanmaele/mvanmaele-test.viz.network'
import styled, { useTheme } from 'styled-components'
import { AppGraphData, initNode } from '@mvanmaele/mvanmaele-test.viz.network'
const LinkLegendContainer = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
  margin-left: -20px;
  margin-top: -5px !important;
`

export const CurvedEdgeEntry = ({ nodeColor }: { nodeColor: string }) => {
  const theme: any = useTheme()
  const legendGraphData: AppGraphData = useMemo(() => {
    return {
      nodes: [initNode('Cited', 1), initNode('Citing', 2)].map(n => {
        return {
          ...n,
          _color: nodeColor,
          _labelColor: theme.colorBlack,
          _labelFontWeight: 'normal',
          _labelYOffset: 0,
          _fontSize: 14.4,
        }
      }),
      links: [{ source: 2, target: 1, value: 1 }],
    }
  }, [theme, nodeColor])

  return (
    <LinkLegendContainer>
      <network.Network
        nodeLabel={undefined}
        linkDirectionalArrowLength={10}
        linkWidth={3}
        warmupTicks={1000}
        zoomToFitSettings={{
          durationMsec: 0,
          initDelayMsec: 0,
          paddingPx: 25,
        }}
        interactionSettings={{
          enableZoomInteraction: false,
          enablePanInteraction: false,
          maxZoom: 5,
        }}
        enableNodeDrag={false}
        onNodeHover={undefined}
        initGraphData={legendGraphData}
      />
    </LinkLegendContainer>
  )
}

export default CurvedEdgeEntry
