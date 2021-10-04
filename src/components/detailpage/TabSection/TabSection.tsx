import React, { useState } from 'react'

import TabButtons from './TabButtons'

import OverviewTab from './tabs/OverviewTab'
import UsersTab from './tabs/UsersTab'
import AccessTab from './tabs/AccessTab'

import { PageContext } from '../../../templates/Detail'

import ReleasesTab from './tabs/ReleasesTab'

export type Tab = {
  id: string
  label: string
}

const tabs: Tab[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'access', label: 'Access & contact information' },
  { id: 'releases', label: 'Releases and updates' },
  { id: 'technical', label: 'Technical information' },
]

const TabSection: React.FC<PageContext> = ({ data }) => {
  const [activeTab, setActiveTab] = useState(tabs[0])
  return (
    <>
      <TabButtons {...{ tabs, activeTab, setActiveTab }} />
      {activeTab.id === 'overview' && <OverviewTab {...{ data }} />}
      {activeTab.id === 'users' && <UsersTab {...{ data }} />}
      {activeTab.id === 'access' && <AccessTab {...{ data }} />}
      {activeTab.id === 'releases' && <ReleasesTab {...{ data }} />}
    </>
  )
}

export default TabSection
