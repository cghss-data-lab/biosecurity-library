import {
  FileNode,
  IGatsbyImageDataParent,
} from 'gatsby-plugin-image/dist/src/components/hooks'
import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface AirtableCMSData {
  nodes: {
    data: {
      Name: string
      Text: string
      Image: {
        localFiles: FileNode[] &
          { childImageSharp: IGatsbyImageDataParent<IGatsbyImageData> }[]
      }
    }
  }[]
}