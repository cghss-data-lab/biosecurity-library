/**
 * Simple legend defining the direction of curved edges in `<ResourceMap />`
 */
import React, { useMemo } from 'react'
import * as network from '@mvanmaele/mvanmaele-test.viz.network'
import styled from 'styled-components'
import { AppGraphData, initNode } from '@mvanmaele/mvanmaele-test.viz.network'
const LinkLegendContainer = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
  margin-left: -20px;
`

export const CurvedEdgeEntry = ({ nodeColor }: { nodeColor: string }) => {
  const legendGraphData: AppGraphData = useMemo(() => {
    return {
      nodes: [initNode('Cited', 1), initNode('Citing', 2)].map(n => {
        return { ...n, _color: nodeColor }
      }),
      links: [{ source: 2, target: 1, value: 1 }],
    }
  }, [nodeColor])
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
