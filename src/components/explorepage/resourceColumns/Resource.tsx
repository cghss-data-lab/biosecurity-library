import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import { Resource } from '../../../pages/explore'
import { urlString } from '../../../airtable-cms/utilities'

const ResourcePreview: React.FC<Resource> = ({ data }) => {
  return (
    <p key={data.Short_Name} style={{ background: 'white' }}>
      <Link
        to={
          '/resource/' +
          urlString(data.Resource_Type) +
          urlString(data.Short_Name)
        }
      >
        {data.Resource_Name}
      </Link>
    </p>
  )
}

export default ResourcePreview
