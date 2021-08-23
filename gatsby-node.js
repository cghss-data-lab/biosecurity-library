const path = require('path')

const makeUrl = string =>
  encodeURI(string.toLowerCase().trim().replace(/ /g, '-'))

exports.createPages = async ({ actions, graphql }) => {
  const detailPageTemplate = path.resolve('./src/templates/Detail.tsx')
  const result = await graphql(`
    {
      resources: allAirtable(
        filter: {
          table: { eq: "Resource Library" }
          data: { Publish_INTERNAL: { eq: true } }
        }
      ) {
        nodes {
          data {
            Resource_Name
            Resource_Type
            Short_Name
            Short_Description
            Long_Description
            Key_Topic_Area_s_
            Authoring_Organization
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

  result.data.resources.nodes.forEach(({ data }) => {
    actions.createPage({
      path:
        'resource/' +
        makeUrl(data.Resource_Type) +
        '/' +
        makeUrl(data.Short_Name),
      component: detailPageTemplate,
      context: { data },
    })
  })
}
