import React, { useState } from 'react'

import TabButtons from './TabButtons'
import OverviewTab from './tabs/OverviewTab'

import { PageContext } from '../../../templates/detail'
import UsersTab from './tabs/UsersTab'

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
    </>
  )
}

export default TabSection
