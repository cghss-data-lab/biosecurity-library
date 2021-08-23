import { ImageDataLike } from 'gatsby-plugin-image'

export interface AirtableCMSText {
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
