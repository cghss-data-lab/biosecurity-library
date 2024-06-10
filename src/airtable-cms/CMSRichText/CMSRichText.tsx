import React from 'react'

import { AirtableCMSData } from 'AirtableCMS'
import { getCMSText } from 'airtable-cms/CMSText'
import RenderCMSRichText from './RenderCMSRichText'

export interface CMSRichTextProps {
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

const CMSRichText = ({
  data,
  name,
  noEmitError = false,
}: CMSRichTextProps): JSX.Element => {
  const markdown = getCMSText(data, name, noEmitError)
  if (!markdown) return <></>
  return <RenderCMSRichText markdown={markdown} />
}

export default CMSRichText
