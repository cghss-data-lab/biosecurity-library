import * as path from 'path'
import { GatsbyNode } from 'gatsby'
import { PageContextData } from './src/templates/Detail'
import {
  getResourceMapData,
  getFullResourceMapData,
} from './src/components/detailpage/ResourceMapSection/ResourceMap/helpers/packageMethods'
import { HyperlinkedGraphData } from './src/components/detailpage/ResourceMapSection/ResourceMap/helpers/resourceMapTypes'
import * as urls from './src/utilities/urls'

// for debugging depreciation warning
// process.on('warning', warning => {
//   console.log(warning.stack)
// })

export const createPages: GatsbyNode['createPages'] = async ({
  actions,
  graphql,
}) => {
  const detailPageTemplate = path.resolve('./src/templates/Detail.tsx')

  const result: any = await graphql(`
    {
      resources: allAirtable(filter: { table: { eq: "Resource Library" } }) {
        nodes {
          id
          data {
            Short_name
            Record_ID_INTERNAL
            Resource_type
            Resource_name
            Auto_other_resources_cited {
              data {
                Record_ID_INTERNAL
              }
            }
          }
        }
      }
    }
  `)

  const resultResourceSets: any = await graphql(`
    {
      resourceSets: allAirtable(
        filter: { table: { eq: "Lookup: Resource sets" } }
      ) {
        nodes {
          data {
            Resource_set_name
            Unique_ID
            Resources_in_set {
              data {
                Resource_name
                Short_name
                Record_ID_INTERNAL
                Resource_type
              }
            }
          }
        }
      }
    }
  `)

  // removed:
  // Topic_Area_Icons

  const fullResourceMapData: HyperlinkedGraphData = getFullResourceMapData(
    result.data.resources.nodes,
    ['Auto_other_resources_cited'],
    'Short_name',
    'Record_ID_INTERNAL',
    'Resource_type'
  )

  result.data.resources.nodes.forEach(
    ({ data, id }: { data: PageContextData['data']; id: string }) => {
      const resourceMapData: HyperlinkedGraphData = getResourceMapData(
        data.Record_ID_INTERNAL,
        fullResourceMapData
      )
      data.Resource_sets = resultResourceSets.data.resourceSets.nodes.filter(
        (d: {
          data: {
            Resources_in_set: { data: { Record_ID_INTERNAL: string } }[]
          }
        }) =>
          d.data.Resources_in_set.some(
            dd => dd.data.Record_ID_INTERNAL === data.Record_ID_INTERNAL
          )
      )
      actions.createPage({
        path: urls.getDetailURL(data),
        component: detailPageTemplate,
        context: {
          id,
          data: {
            ...data,
            resourceMapData,
          },
        },
      })
    }
  )
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  loaders,
  getConfig,
  actions,
}) => {
  if (getConfig().mode === 'production') {
    // disabling source maps in prod build... I just don't see any benefit to it.
    actions.setWebpackConfig({
      devtool: false,
    })
  }
  if (stage === 'build-html' || stage === 'develop-html') {
    // disabling webpack evaluation of react-force-graph-2d during SSR
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /force-graph/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
