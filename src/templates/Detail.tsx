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
    Short_Description: string
    Long_Description: string
    Key_Topic_Area_s_: string[]
    Resource_Name: string
    Short_Name: string
    Resource_Type: string
    Authoring_Organization: string
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
