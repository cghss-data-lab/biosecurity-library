import React from 'react'
import { render } from '@testing-library/react'
import ResourceMap from './ResourceMap'
import { PageContext } from '../../../../templates/Detail'
import * as network from '@mvanmaele/mvanmaele-test.viz.network'

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
  Potential_user_role: ['Test'],
  URL_for_resource: 'Test',
  Access_information: 'Test',
  Access_limitations: 'Test',
  Resource_language: ['Test'],
  Edition: 'Test',
  First_release_date: 'Test',
  Last_update_date: 'Test',
  Update_frequency: 'Test',
  Topic_area_icons: 'Test',
  Files_INTERNAL: {
    localFiles: [{ publicURL: 'Test', name: 'Test' }],
  },
  Thumbnail_INTERNAL: {
    localFiles: [],
  },
  Auto_other_resources_cited: [{ data: { Record_ID_INTERNAL: 'recTest' } }],
}

/**
 * Mock nodes/links based on resource data structure for testing purposes.
 */
const MOCK_NAME: string = MOCK_RESOURCE_DATA.Resource_name
export const MOCK_GRAPH_DATA: network.AppGraphData = {
  nodes: [initMockNode(MOCK_NAME, MOCK_NAME)],
  links: [{ source: MOCK_NAME, target: MOCK_NAME }],
}

describe('ResourceMap', () => {
  // is it hidden when it should be?
  it('should not render if there are no links to show', () => {
    const { container: containerNoLinks } = render(
      <ResourceMap graphData={{ nodes: MOCK_GRAPH_DATA.nodes, links: [] }} />
    )
    const canvases: NodeListOf<HTMLCanvasElement> =
      containerNoLinks.querySelectorAll('canvas')
    expect(canvases.length).toEqual(0)
  })

  // otherwise: if rendered:
  it('should render with one canvas element', () => {
    const { container } = render(<ResourceMap graphData={MOCK_GRAPH_DATA} />)
    const canvases: NodeListOf<HTMLCanvasElement> =
      container.querySelectorAll('canvas')
    expect(canvases.length).toEqual(1)
  })

  // it('should display instruction text', () => {
  //   expect(false).toStrictEqual(true) // TODO implement
  // })
})

/**
 * Return initialized mock graph node with given label and unique ID
 * @param label Node label
 * @param id Node unique ID
 * @returns Initialized mock node
 */
function initMockNode(label: string, id: number | string): network.GraphNode {
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
