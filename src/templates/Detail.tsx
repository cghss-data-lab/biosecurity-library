import React from 'react'
import { ImageDataLike } from 'gatsby-plugin-image'

// layout components
import Main from '../components/layout/Main'
import NavBar from '../components/layout/NavBar/NavBar'
import FigmaProvider from '../figma/FigmaProvider'

// page-specific components
import Breadcrumbs from '../components/detailpage/Breadcrumbs/Breadcrumbs'
import Grid from '../components/detailpage/Grid'
import Header from '../components/detailpage/Header/Header'
import Thumbnail from '../components/detailpage/Thumbnail/Thumbnail'
import TabSection from '../components/detailpage/TabSection/TabSection'

export interface PageContext {
  data: {
    Short_description: string
    Long_description: string
    Key_topic_area: string[]
    Resource_name: string
    Short_name: string
    Resource_type: string
    Authoring_organization: string
    Target_user_role: string[]
    Potential_user_role: string[]
    URL_for_resource: string
    Access_information: string
    Access_limitations: string
    Resource_language: string[]
    Edition: string
    First_release_date: string
    Last_update_date: string
    Update_frequency: string
    Topic_area_icons: string
    Auto_other_resources_cited: string[]
    Files_INTERNAL: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
    Thumbnail_INTERNAL: {
      localFiles: ImageDataLike[]
    }
  }
}

const Detail: React.FC<{ pageContext: PageContext }> = ({
  pageContext: { data },
}) => (
  <FigmaProvider>
    <NavBar />
    <Main>
      <Breadcrumbs {...{ data }} />
      <Grid>
        <Thumbnail {...{ data }} />
        <Header {...{ data }} />
        <TabSection {...{ data }} />
      </Grid>
    </Main>
  </FigmaProvider>
)

export default Detail
