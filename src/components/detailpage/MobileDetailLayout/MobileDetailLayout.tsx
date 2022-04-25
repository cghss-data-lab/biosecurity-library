import React from 'react'
import styled from 'styled-components'

import { PageContext } from '../../../templates/Detail'
import Header from '../Header/Header'
import DetailsTab from '../TabSection/tabs/DetailsTab'
import OverviewTab from '../TabSection/tabs/OverviewTab'
import RelatedTab from '../TabSection/tabs/RelatedTab'
import Thumbnail from '../Thumbnail/Thumbnail'

const Container = styled.section`
  display: flex;
  flex-direction: column;
`
const TabHeader = styled.header`
  background-color: ${({ theme }) => theme.colorDarkest};
  color: white;
  font-size: 20px;
  text-align: center;
  padding: 15px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  margin-top: 10px;
`

const MobileDetailLayout = ({ data }: PageContext) => {
  return (
    <Container>
      <Header {...{ data }} />
      <Thumbnail {...{ data }} />
      <TabHeader>Overview</TabHeader>
      <OverviewTab {...{ data }} />
      <TabHeader>Details</TabHeader>
      <DetailsTab {...{ data }} />
      {/* {data.Resource_sets !== null && data.Resource_sets.length > 0 && (
        <>
          <TabHeader>Related resources</TabHeader>
          <RelatedTab {...{ data }} />
        </>
      )} */}
    </Container>
  )
}

export default MobileDetailLayout
