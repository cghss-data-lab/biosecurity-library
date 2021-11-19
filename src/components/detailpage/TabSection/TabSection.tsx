import React, { useState } from 'react'
import styled from 'styled-components'

import TabButtons from './TabButtons'

import OverviewTab from './tabs/OverviewTab'
import DetailsTab from './tabs/DetailsTab'
import RelatedTab from './tabs/RelatedTab'
import DocumentTab from './tabs/DocumentTab'
// import UsersTab from './tabs/UsersTab'
// import AccessTab from './tabs/AccessTab'
// import ReleasesTab from './tabs/ReleasesTab'

import { PageContext } from '../../../templates/Detail'

export type Tab = {
  id: string
  label: string
}

const Container = styled.div`
  border-top: 8px solid ${({ theme }) => theme.colorDarkest};
  width: 100%;
`

const TabSection: React.FC<PageContext> = ({ data }) => {
  return (
    <>
      <Container style={{ gridArea: 'tabs' }}>download</Container>
      <Container style={{ gridArea: 'content' }}>
        <iframe
          title="document preview"
          src={data.Files_INTERNAL.localFiles[0].publicURL}
          style={{ height: '80vh', width: '100%' }}
        />
      </Container>
    </>
  )
}

export default TabSection
