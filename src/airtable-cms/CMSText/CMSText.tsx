import React from 'react'
import { AirtableCMSData } from '../types'

export const getCMSText = (data: AirtableCMSData, name: string) => {
  const text = data.nodes.find(n => n.data.Name === name)?.data.Text
  if (text) return text
  throw new Error(
    `Text section ${name} not found in ` +
      `the Airtable data specified. Does that ` +
      `query include the right tables, and ` +
      `does one of those tables include a ` +
      `section called ${name}?`
  )
}

const CMSText: React.FC<{
  name: string
  data: AirtableCMSData
}> = ({ data, name }) => {
  const text = getCMSText(data, name)
  return <>{text}</>
}

export default CMSText
