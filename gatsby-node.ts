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
            Resource_Name
            Resource_Type
            Short_Name
            Short_Description
            Long_Description
            Key_Topic_Area_s_
            Authoring_Organization
            Target_user_role
            Potential_user_role
            URL_for_Resource
            Access_Information
            Access_Limitations
            Resource_Language
            Edition
            First_Release_Date
            Last_Update_Date
            Update_Frequency
            Topic_Area_Icons
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

  result.data.resources.nodes.forEach(
    ({ data }: { data: PageContext['data'] }) => {
      actions.createPage({
        path:
          'resource/' +
          urlString(data.Resource_Type) +
          urlString(data.Short_Name),
        component: detailPageTemplate,
        context: { data },
      })
    }
  )
}
