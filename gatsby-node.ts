import path from 'path'
import { GatsbyNode } from 'gatsby'
import { urlString } from './src/airtable-cms/utilities'
import { PageContext } from './src/templates/Detail'

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

  result.data.resources.nodes.forEach(
    ({ data }: { data: PageContext['data'] }) => {
      actions.createPage({
        path:
          'resource/' +
          urlString(data.Resource_type) +
          urlString(data.Short_name),
        component: detailPageTemplate,
        context: { data },
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
