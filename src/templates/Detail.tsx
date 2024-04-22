import React from 'react'
import { graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import { AppGraphData } from '@talus-analytics/viz.charts.network-tools'

// layout components
import Main from '../components/layout/Main'
import NavBar from '../components/layout/NavBar/NavBar'
import FigmaProvider from '../figma/FigmaProvider'

// page-specific components
// import Breadcrumbs from '../components/detailpage/Breadcrumbs/Breadcrumbs'
import Grid from '../components/detailpage/Grid'
import Header from '../components/detailpage/Header/Header'
import Thumbnail from '../components/detailpage/Thumbnail/Thumbnail'
import TabSection from '../components/detailpage/TabSection/TabSection'
import Footer from 'components/layout/Footer'
import CMS from 'AirtableCMS'
import { useMediaQuery } from 'react-responsive'
import MobileDetailLayout from 'components/detailpage/MobileDetailLayout/MobileDetailLayout'

/**
 * Resource Airtable fields that link to other records
 */
export type LinkField = 'Resources_cited'
export type ResourceSetProps = {
  data: {
    Resource_set_name: string
    Unique_ID: number
    Description: string | null
    Resources_in_set: {
      data: {
        Record_ID_INTERNAL: string
        Resource_name: string
        Short_name: string
        Resource_type: string
      }
    }[]
  }
  nameField?: keyof ResourceSetProps['data']['Resources_in_set'][0]['data']
}
export interface PageContext {
  data: {
    resources: {
      nodes: PageContextData[]
    }
  }
  pageContext: {
    data: {
      Resource_sets: ResourceSetProps[] | null

      // Below: Additional data elements not directly sourced from Airtable.

      /**
       * Optional: Resource map nodes/links data to render in a network map on the
       * resource's page. Defaults to undefined (no map rendered).
       */
      resourceMapData?: AppGraphData
    }
  }
}

export interface PageContextData {
  data: {
    Record_ID_INTERNAL: string
    Short_description: string
    Long_description: string
    Key_topic_area: {
      data: {
        Name: string
      }
    }[]
    Resource_name: string
    Short_name: string
    Resource_type: string
    Key_resource: string
    Target_user_role: {
      data: {
        Name: string
      }
    }[]
    User_type: string[]
    URL_for_resource: string
    Access_method: string
    Access_limitations: string[]
    Resource_language: string[]
    Edition: string | null
    First_release_date: string
    Last_update_date: string
    Update_frequency: string
    Other_language_URLs: string
    Authoring_organization: {
      data: {
        value: string
      }
    }[]
    Authoring_organization_type: {
      data: {
        value: string
      }
    }[]
    Resources_cited:
      | {
          data: {
            Record_ID_INTERNAL: string
          }
        }[]
      | null
    Primary_file: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
    Other_language_files: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
    Thumbnail: {
      localFiles: ImageDataLike[]
    }
    Resource_sets: ResourceSetProps[] | null

    // Below: Additional data elements not directly sourced from Airtable.

    /**
     * Optional: Resource map nodes/links data to render in a network map on the
     * resource's page. Defaults to undefined (no map rendered).
     */
    resourceMapData?: AppGraphData
  }
}

const Detail = ({ data: queryData, pageContext }: PageContext) => {
  const mobileLayout = useMediaQuery({ query: '(max-width: 1000px)' })

  let {
    resources: {
      nodes: [{ data }],
    },
  } = queryData

  data = { ...data, ...pageContext.data }

  console.log(`Building page ${data.Short_name}`)

  return (
    <FigmaProvider>
      <CMS.SEO
        title={data.Resource_name}
        description={data.Short_description}
      />
      <NavBar />
      <Main>
        {/*<Breadcrumbs {...{ data }} />*/}
        {!mobileLayout && (
          <Grid>
            <Thumbnail {...{ data }} />
            <Header {...{ data }} />
            <TabSection {...{ data }} />
          </Grid>
        )}
        {mobileLayout && <MobileDetailLayout {...{ data }} />}
      </Main>
      <Footer />
    </FigmaProvider>
  )
}

export const query = graphql`
  query ($id: String!) {
    resources: allAirtable(filter: { id: { eq: $id } }) {
      nodes {
        data {
          Short_name
          Record_ID_INTERNAL
          Resource_type
          Resource_name
          Short_description
          Long_description
          Key_topic_area {
            data {
              Name
            }
          }
          Key_resource
          Target_user_role {
            data {
              Name
            }
          }
          User_type
          URL_for_resource
          Access_method
          Access_limitations
          Resource_language
          Edition
          First_release_date
          Last_update_date
          Update_frequency
          Other_language_URLs
          Authoring_organization: Authoring_organization {
            data {
              value: Name
            }
          }
          Authoring_organization_type: Authoring_organization {
            data {
              value: Type
            }
          }
          Resources_cited {
            data {
              Record_ID_INTERNAL
            }
          }
          Primary_file {
            localFiles {
              publicURL
              name
            }
          }
          Other_language_files {
            localFiles {
              publicURL
              name
            }
          }
          Thumbnail {
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
`

export default Detail
