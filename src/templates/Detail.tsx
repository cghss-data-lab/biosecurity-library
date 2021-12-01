import React from 'react'
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

/**
 * Resource Airtable fields that link to other records
 */
export type LinkField = 'Auto_other_resources_cited'
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
    Record_ID_INTERNAL: string
    Short_description: string
    Long_description: string
    Key_topic_area: string[]
    Resource_name: string
    Short_name: string
    Resource_type: string
    Seminal_resource: string
    Authoring_organization: {
      data: {
        Name: string
      }
    }[]
    Target_user_role: string[]
    Potential_user_role: string[]
    URL_for_resource: string
    Access_method: string
    Access_limitations: string
    Resource_language: string[]
    Edition: string | null
    First_release_date: string
    Last_update_date: string
    Update_frequency: string
    // Topic_area_icons: string
    Auto_other_resources_cited:
      | {
          data: {
            Record_ID_INTERNAL: string
          }
        }[]
      | null
    // Topic_area_icons: string
    Files_INTERNAL: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
    Thumbnail_INTERNAL: {
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

const Detail: React.FC<{ pageContext: PageContext }> = ({
  pageContext: { data },
}) => (
  <FigmaProvider>
    <NavBar />
    <Main>
      {/*<Breadcrumbs {...{ data }} />*/}
      <Grid>
        <Thumbnail {...{ data }} />
        <Header {...{ data }} />
        <TabSection {...{ data }} />
      </Grid>
    </Main>
  </FigmaProvider>
)

export default Detail
