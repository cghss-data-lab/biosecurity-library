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
  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Resource details' },
    ...(data.Resource_sets !== null && data.Resource_sets.length > 0
      ? [{ id: 'related', label: 'Related resources' }]
      : []),
    ...(data.Files_INTERNAL
      ? [{ id: 'document', label: 'Document preview' }]
      : []),
    // { id: 'users', label: 'Users' },
    // { id: 'access', label: 'Access & contact information' },
    // { id: 'releases', label: 'Releases and updates' },
    // { id: 'technical', label: 'Technical information' },
  ]

  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <>
      <Container style={{ gridArea: 'tabs' }}>
        <TabButtons {...{ tabs, activeTab, setActiveTab }} />
      </Container>
      <Container style={{ gridArea: 'content' }}>
        {activeTab.id === 'overview' && <OverviewTab {...{ data }} />}
        {activeTab.id === 'details' && <DetailsTab {...{ data }} />}
        {activeTab.id === 'related' && <RelatedTab {...{ data }} />}
        {activeTab.id === 'document' && <DocumentTab {...{ data }} />}

        {/*{activeTab.id === 'users' && <UsersTab {...{ data }} />}*/}
        {/*{activeTab.id === 'access' && <AccessTab {...{ data }} />}*/}
        {/*{activeTab.id === 'releases' && <ReleasesTab {...{ data }} />}*/}
      </Container>
    </>
  )
}

export default TabSection
