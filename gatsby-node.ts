import path from 'path'
import { GatsbyNode } from 'gatsby'
import { urlString } from './src/airtable-cms/utilities'
import { PageContext } from './src/templates/Detail'
import {
  getResourceMapData,
  getFullResourceMapData,
} from './src/components/detailpage/ResourceMap/helpers/resourceMapHelpers'
import { AppGraphData } from '@mvanmaele/mvanmaele-test.viz.network'

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const detailPageTemplate = path.resolve('./src/templates/Detail.tsx')

  const result: any = await graphql(`
    {
      resources: allAirtable(filter: { table: { eq: "Resource Library" } }) {
        nodes {
          data {
            Record_ID_INTERNAL
            Resource_name
            Resource_type
            Short_name
            Short_description
            Long_description
            Key_topic_area
            Authoring_organization
            Target_user_role
            Potential_user_role
            URL_for_resource
            Access_information
            Access_limitations
            Resource_language
            Edition
            First_release_date
            Last_update_date
            Update_frequency
            Auto_other_resources_cited
            Files_INTERNAL {
              localFiles {
                publicURL
                name
              }
            }
            Thumbnail_INTERNAL {
              localFiles {
                childImageSharp {
                  gatsbyImageData(width: 200, placeholder: BLURRED)
                }
              }
            }
          }
        }
      }
    }
  `)

  // removed:
  // Topic_Area_Icons

  const fullResourceMapData: AppGraphData = getFullResourceMapData(
    result.data.resources.nodes,
    ['Auto_other_resources_cited'],
    'Short_name',
    'Record_ID_INTERNAL',
    'Resource_type'
  )

  result.data.resources.nodes.forEach(
    ({ data }: { data: PageContext['data'] }) => {
      const resourceMapData: AppGraphData = getResourceMapData(
        data.Record_ID_INTERNAL,
        fullResourceMapData
      )
      actions.createPage({
        path:
          'resource/' +
          urlString(data.Resource_type) +
          urlString(data.Short_name),
        component: detailPageTemplate,
        context: { data: { ...data, resourceMapData } },
      })
    }
  )
}

// disabling source maps in prod build... I just don't see any benefit to it.
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  getConfig,
  actions,
}) => {
  if (getConfig().mode === 'production') {
    actions.setWebpackConfig({
      devtool: false,
    })
  }
}
