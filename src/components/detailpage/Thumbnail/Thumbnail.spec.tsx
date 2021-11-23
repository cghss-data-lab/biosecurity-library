import React from 'react'
import { render } from '@testing-library/react'
import { PageContext } from '../../../templates/Detail'
import Thumbnail from './Thumbnail'

describe('Thumbnail', () => {
  it('renders correctly', () => {
    const result = render(<Thumbnail data={MOCK_RESOURCE_DATA} />)
    expect(result).toMatchSnapshot()
  })
})

const MOCK_RESOURCE_DATA: PageContext['data'] = {
  Record_ID_INTERNAL: 'Test',
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
  Access_method: 'Test',
  Access_limitations: 'Test',
  Resource_language: ['Test'],
  Edition: 'Test',
  First_release_date: 'Test',
  Last_update_date: 'Test',
  Update_frequency: 'Test',
  Resource_sets: null,
  Files_INTERNAL: {
    localFiles: [{ publicURL: 'Test', name: 'Test' }],
  },
  Thumbnail_INTERNAL: {
    localFiles: [],
  },
  Auto_other_resources_cited: [{ data: { Record_ID_INTERNAL: 'Test' } }],
}
