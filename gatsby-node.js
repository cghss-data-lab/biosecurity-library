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
            Key_Topic_Area_s_
            Authoring_Organization
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
