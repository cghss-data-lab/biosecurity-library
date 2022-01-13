import React, { FC } from 'react'
import styled from 'styled-components'

import { PageContext } from '../../../templates/Detail'
import { InfoTip } from '../../ui/InfoTip'
import ResourceMap from './ResourceMap/ResourceMap'
import ResourceMapLegend from './ResourceMapLegend/ResourceMapLegend'

import { AppGraphData } from '@talus-analytics/viz.charts.network-tools'

interface ResourceMapSectionProps {
  data: PageContext['data']
}

const Section = styled.div`
  display: flex;
`

export const ResourceMapSection: FC<ResourceMapSectionProps> = ({ data }) => {
  const mapNotEmpty: boolean =
    data.resourceMapData !== undefined &&
    data.resourceMapData.links.length > 0 &&
    data.resourceMapData.nodes.length > 1

  return (
    <>
      <h5>
        RESOURCE MAP{' '}
        <InfoTip
          content={
            <span style={{ fontFamily: `'Open Sans', sans-serif` }}>
              Mentions between resources in the biosecurity library are
              identified using both an automated text-matching algorithm and
              some manual review.
            </span>
          }
        />
      </h5>
      {data.resourceMapData !== undefined && mapNotEmpty && (
        <div>
          <p>
            {getMentionsCountText(
              data?.Record_ID_INTERNAL,
              data.resourceMapData
            )}
          </p>
          <em>Click resource in map to go to page</em>
          <Section>
            <ResourceMapLegend
              selectedNode={data}
              graphData={data.resourceMapData}
            />
            <ResourceMap selectedNode={data} graphData={data.resourceMapData} />
          </Section>
        </div>
      )}
      {!mapNotEmpty && (
        <p>
          This resource is not currently known to mention or be mentioned by any
          other resources in the library.
        </p>
      )}
    </>
  )
}

/**
 * Returns text describing how many resources this one mentions or is
 * mentioned by
 * @param resId The ID of the resource whose page it is
 * @param graphData The nodes and links
 * @returns Text describing mention counts
 */
function getMentionsCountText(
  resId: string | undefined,
  graphData: AppGraphData
): string {
  if (resId === undefined) return ''
  const mentions: number = getUniqueNodeIdCount(graphData, 'target', resId)
  const mentionedBy: number = getUniqueNodeIdCount(graphData, 'source', resId)
  const mentionDesc: string = getMentionString(mentions, mentionedBy)
  return mentionDesc
}

/**
 * Returns the count of unique target/source connections the selected node
 * has in the graph data.
 *
 * @param graphData The nodes and links
 *
 * @param field The field (target or source) for which to count unique node IDs
 *
 * @param selectedNodeId
 * The ID of the node whose incoming and outgoing connections are
 * to be counted
 *
 * @returns The count
 */
function getUniqueNodeIdCount(
  graphData: AppGraphData,
  field: 'target' | 'source',
  selectedNodeId: string | undefined
): number {
  const otherField: 'target' | 'source' =
    field === 'target' ? 'source' : 'target'
  return [
    ...new Set(
      graphData.links
        .filter(
          l => l[field] !== selectedNodeId && l[otherField] === selectedNodeId
        )
        .map(l => l[field])
    ),
  ].length
}

/**
 * Returns text describing how many resources this one mentions or is
 * mentioned by
 * @param mentions Number of other resources mentioned
 * @param mentionedBy Number of other resources mentioned by
 * @returns Text describing the counts
 */
function getMentionString(mentions: number, mentionedBy: number) {
  let text: string = 'This resource '
  const pieces: string[] = []
  if (mentions > 0)
    pieces.push(
      `mentions ${mentions} other resource${mentions === 1 ? '' : 's'}`
    )
  if (mentionedBy > 0)
    pieces.push(
      `is mentioned by ${mentionedBy} other resource${
        mentionedBy === 1 ? '' : 's'
      }`
    )
  pieces.forEach((s, i) => {
    if (i > 0) text += ' and ' + s
    else text += s
  })
  text += ` that ${
    mentions + mentionedBy === 1 ? 'is' : 'are'
  } also in the library.`
  return text
}

export default ResourceMapSection
