import { AirtableCMSText } from './types'

const getCMSText = (homePageText: AirtableCMSText, name: string) =>
  homePageText.nodes.find(n => n.data.Name === name)?.data.Text

export default getCMSText
