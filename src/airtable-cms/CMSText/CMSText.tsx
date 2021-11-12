import React from 'react'
import { AirtableCMSData } from '../CMSTypes'

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

interface CMSTextProps {
  /**
   * name of the text section in the table
   */
  name: string
  /**
   * result from the standard-format airtable
   * CMS query; may include both text and images.
   */
  data: AirtableCMSData
  /**
   * Suppress error handling; this will return
   * an empty fragment instead of throwing an
   * error if the requested text is missing
   * or empty.
   */
  noEmitError?: boolean
}

const CMSText = ({ data, name }: CMSTextProps): JSX.Element => {
  const text = getCMSText(data, name)
  return <>{text}</>
}

export default CMSText
