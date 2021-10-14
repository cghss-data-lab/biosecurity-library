import React from 'react'
import renderer from 'react-test-renderer'
import Thumbnail from './Thumbnail'

describe('Thumbnail', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Thumbnail data={MOCK_RESOURCE_DATA} />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

const MOCK_RESOURCE_DATA = {
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
}
