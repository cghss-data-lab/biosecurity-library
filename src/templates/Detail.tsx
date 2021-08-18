import React from 'react'
import Main from '../components/layout/Main'
import NavBar from '../components/layout/NavBar/NavBar'
import FigmaProvider from '../figma/FigmaProvider'

interface PageContext {
  data: {
    Description: string
    Key_Topic_Areas_s_: string[]
    Resource_Name: string
    Short_Name: string
  }
}

const Detail = ({ pageContext: { data } }: { pageContext: PageContext }) => {
  console.log(data)
  return (
    <FigmaProvider>
      <NavBar />
      <Main>
        <h1>{data.Resource_Name}</h1>
        <p>{data.Description}</p>
      </Main>
    </FigmaProvider>
  )
}

export default Detail
