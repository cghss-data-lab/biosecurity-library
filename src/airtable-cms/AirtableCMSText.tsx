import React from 'react'
import { AirtableCMSData } from './types'

export const getCMSText = (data: AirtableCMSData, name: string) =>
  data.nodes.find(n => n.data.Name === name)?.data.Text

const AirtableCMSText: React.FC<{
  name: string
  data: AirtableCMSData
}> = ({ data, name }) => {
  const text = getCMSText(data, name)
  if (text) return <>{text}</>
  throw new Error(`Text section ${name} not found.`)
}

export default AirtableCMSText
