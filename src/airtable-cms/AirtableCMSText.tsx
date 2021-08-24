import { AirtableCMSData } from './types'

export const getCMSText = (data: AirtableCMSData, name: string) =>
  data.nodes.find(n => n.data.Name === name)?.data.Text

const AirtableCMSText: React.FC<{
  name: string
  data: AirtableCMSData
}> = ({ data, name }) => {
  return <>{getCMSText(data, name)}</>
}

export default AirtableCMSText
