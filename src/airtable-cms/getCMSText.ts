import { AirtableCMSText } from './types'

const getCMSText = (data: AirtableCMSText, name: string) =>
  data.nodes.find(n => n.data.Name === name)?.data.Text

export default getCMSText
