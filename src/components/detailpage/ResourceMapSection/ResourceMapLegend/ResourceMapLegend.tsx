import React, { FC } from 'react'
import { useTheme } from 'styled-components'

import { AppGraphData } from '@talus-analytics/viz.charts.network-tools'
import { useAllCMSIcons } from '@talus-analytics/library.airtable.cms-icon'

import Legend from '../ResourceMap/Legend/Legend'
import CurvedEdgeEntry from '../ResourceMap/Legend/CurvedEdgeEntry'
import IconEntries, { IconEntry } from '../ResourceMap/Legend/IconEntries'
import { PageContext } from '../../../../templates/Detail'

interface ResourceMapLegendProps {
  selectedNode: PageContext['data']
  graphData: AppGraphData
  curvedLinks?: boolean
}
const ResourceMapLegend: FC<ResourceMapLegendProps> = ({
  selectedNode,
  graphData,
  curvedLinks = true,
}): JSX.Element => {
  const theme: any = useTheme()
  const icons = useAllCMSIcons()
  return (
    <Legend>
      <h6>Legend</h6>
      {/* Resource type icons legend */}
      {selectedNode !== undefined && (
        <IconEntry
          label={'This resource'}
          value={selectedNode.Resource_type}
          frameColor={theme.colorYellow}
          frameShape={'hexagon'}
        />
      )}
      <IconEntries
        icons={icons.filter(icon => {
          return graphData?.nodes.map(n => n._icon).includes(icon.name)
        })}
      />
      {/* Link direction legend */}
      {curvedLinks && (
        <CurvedEdgeEntry nodeColor={theme?.colorDarker || 'skyblue'} />
      )}
    </Legend>
  )
}

export default ResourceMapLegend
