import { ImageDataLike } from 'gatsby-plugin-image'

export interface AirtableCMSData {
  nodes: [
    {
      data: {
        Name: string
        Text: string
        Image: {
          localFiles: ImageDataLike[]
        }
      }
    }
  ]
}
