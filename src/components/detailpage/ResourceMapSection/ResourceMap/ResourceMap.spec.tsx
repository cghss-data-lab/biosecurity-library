import React from 'react'
import { render } from '@testing-library/react'
import ResourceMap from './ResourceMap'
import { PageContext } from '../../../../templates/Detail'
import {
  AppGraphData,
  GraphNode,
} from '@talus-analytics/viz.charts.network-tools'
import FigmaProvider from '../../../../figma/FigmaProvider'
import ResourceMapSection from '../ResourceMapSection'

// mock Airtable icons
jest.mock('../../../../airtable-cms/AirtableCMSIcon', () => {
  return {
    __esModule: true,
    default: () => {
      return <p></p>
    },
  }
})

/**
 * Mock data for individual resource
 */
export const MOCK_RESOURCE_DATA: PageContext['data'] = {
  Record_ID_INTERNAL: 'recTest',
  Short_description: 'Test',
  Long_description: 'Test',
  Key_topic_area: ['Test'],
  Resource_name: 'Test',
  Short_name: 'Test',
  Resource_type: 'Test',
  Authoring_organization: [{ data: { Name: 'Test' } }],
  Target_user_role: ['Test'],
  URL_for_resource: 'Test',
  Access_method: 'Test',
  Access_limitations: 'Test',
  Resource_language: ['Test'],
  Edition: 'Test',
  Resource_sets: [],
  First_release_date: 'Test',
  Last_update_date: 'Test',
  Update_frequency: 'Test',
  // Topic_area_icons: 'Test',
  Primary_file: {
    localFiles: [{ publicURL: 'Test', name: 'Test' }],
  },
  Thumbnail: {
    localFiles: [],
  },
  Resources_cited: [{ data: { Record_ID_INTERNAL: 'recTest' } }],
}

/**
 * Mock nodes/links based on resource data structure for testing purposes.
 */
const MOCK_NAME: string = MOCK_RESOURCE_DATA.Resource_name
export const MOCK_GRAPH_DATA: AppGraphData = {
  nodes: [initMockNode(MOCK_NAME, MOCK_NAME)],
  links: [{ source: MOCK_NAME, target: MOCK_NAME }],
}

describe('ResourceMap', () => {
  it('should not render if there are no links to show', () => {
    const { container: containerNoLinks } = render(
      <FigmaProvider>
        <ResourceMapSection
          data={{
            ...MOCK_RESOURCE_DATA,
            resourceMapData: undefined,
          }}
        />
      </FigmaProvider>
    )
    const canvases: NodeListOf<HTMLCanvasElement> =
      containerNoLinks.querySelectorAll('canvas')
    expect(canvases.length).toEqual(0)
  })

  // otherwise: if rendered:
  it('should render with one main canvas element', () => {
    const { container } = render(
      <FigmaProvider>
        <ResourceMap graphData={MOCK_GRAPH_DATA} />
      </FigmaProvider>
    )
    const canvases: NodeListOf<HTMLCanvasElement> = container.querySelectorAll(
      '[data-network] canvas'
    )
    expect(canvases.length).toEqual(1)
  })
})

/**
 * Return initialized mock graph node with given label and unique ID
 * @param label Node label
 * @param id Node unique ID
 * @returns Initialized mock node
 */
function initMockNode(label: string, id: number | string): GraphNode {
  return {
    _label: label,
    _id: id,
    _color: 'skyblue',
    _shape: 'circle',
    _nodeType: 'default',
    _show: true,
    _fontSize: 16,
    _icon: '',
    _showLabel: true,
    _labelPos: 'bottom',
    _size: 1,
  }
}
