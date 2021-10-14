import React from 'react'
import { render } from '@testing-library/react'
import ResourceMap from './ResourceMap'
import { PageContext } from '../../../templates/Detail'

const LINK_FIELD: 'Auto_other_resources_cited' = 'Auto_other_resources_cited'

const MOCK_RESOURCE_DATA: PageContext['data'] = {
  Short_description: 'Test',
  Long_description: 'Test',
  Key_topic_area: ['Test'],
  Resource_name: 'Test',
  Short_name: 'Test',
  Resource_type: 'Test',
  Authoring_organization: 'Test',
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
  [LINK_FIELD]: ['Test2'],
}

describe('ResourceMap', () => {
  // is it hidden when it should be?
  it('should not render if there are no links to show', () => {
    const { container: containerNoLinks } = render(
      <ResourceMap data={{ ...MOCK_RESOURCE_DATA, [LINK_FIELD]: [] }} />
    )
    const canvases: NodeListOf<HTMLCanvasElement> =
      containerNoLinks.querySelectorAll('canvas')
    expect(canvases.length).toEqual(0)
  })

  // otherwise: if rendered:
  it('should render with one canvas element', () => {
    const { container } = render(<ResourceMap data={MOCK_RESOURCE_DATA} />)
    const canvases: NodeListOf<HTMLCanvasElement> =
      container.querySelectorAll('canvas')
    expect(canvases.length).toEqual(1)
  })

  // it('should display instruction text', () => {
  //   expect(false).toStrictEqual(true) // TODO implement
  // })
})
