import React from 'react'
import Breadcrumbs from '../components/detailpage/Breadcrumbs/Breadcrumbs'
import Grid from '../components/detailpage/Grid'
import Header from '../components/detailpage/Header/Header'
import Thumbnail from '../components/detailpage/Thumbnail/Thumbnail'
import Main from '../components/layout/Main'
import NavBar from '../components/layout/NavBar/NavBar'
import FigmaProvider from '../figma/FigmaProvider'

export interface PageContext {
  data: {
    Short_Description: string
    Key_Topic_Areas_s_: string[]
    Resource_Name: string
    Short_Name: string
    Resource_Type: string
    Authoring_Organization: string
  }
}

const Detail = ({ pageContext: { data } }: { pageContext: PageContext }) => (
  <FigmaProvider>
    <NavBar />
    <Main>
      <Breadcrumbs {...{ data }} />
      <Grid>
        <Thumbnail />
        <Header {...{ data }} />
      </Grid>
    </Main>
  </FigmaProvider>
)

export default Detail
