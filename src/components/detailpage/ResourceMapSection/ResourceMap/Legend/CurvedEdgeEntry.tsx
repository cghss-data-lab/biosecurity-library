/**
 * Simple legend defining the direction of curved edges in `<ResourceMap />`
 */
import React, { useMemo } from 'react'
import * as network from '../../../../../../viz/charts/network'
import styled from 'styled-components'
import { initNode } from '../../../../../../viz/charts/network'
import { AppGraphData } from '../../../../../../viz/charts/network-tools'

const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: -5px !important;
  font-size: 0.8em;
`

const Entry = styled.div`
  position: relative;
  width: 150px;
  height: 100px;
  left: -31px;
`

const Label = styled.div`
  position: relative;
  top: -15px;
  margin-bottom: -15px;
`

export const CurvedEdgeEntry = ({ nodeColor }: { nodeColor: string }) => {
  const data: AppGraphData = useMemo(() => {
    return {
      nodes: [initNode('B', 1), initNode('A', 2)].map(n => {
        return {
          ...n,
          _color: nodeColor,
          _labelColor: '#ffffff',
          _labelFontWeight: 'normal',
          _labelYOffset: -8.5,
          _fontSize: 13.4,
        }
      }),
      links: [{ source: 2, target: 1, value: 1 }],
    }
  }, [nodeColor])

  return (
    <Container>
      <Entry>
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
          initGraphData={data}
        />
      </Entry>
      <Label>Resource A mentions B</Label>
    </Container>
  )
}

export default CurvedEdgeEntry
