import React from 'react'
import styled from 'styled-components'

import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'

import Dropdown from 'components/ui/Dropdown'

const ThumbnailContainer = styled.div`
  grid-area: thumbnail;
  padding: 30px 15px 15px 0;
`

const ThumbnailShadow = styled(GatsbyImage)`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.24);
  border-radius: 5px;
`

interface ThumbnailProps {
  data: {
    Thumbnail_INTERNAL: {
      localFiles: ImageDataLike[]
    }
    Short_name: string
    Other_language_URLs: string
    Resource_language: string[]
    Files_INTERNAL?: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
    Other_language_files_INTERNAL?: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
  }
}

const DropdownButton = styled.button<{ open: boolean; animDuration: number }>`
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #bdd9f2;
  /* Lighter */

  border: 2px solid #bdd9f2;
  box-sizing: border-box;
  box-shadow: 0px 1.5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  transition: ${({ animDuration }) => animDuration + 'ms ease'};
  margin-top: 30px;
  padding: 10px 20px;
`

const DownloadContainer = styled.div`
  padding: 15px;
  min-width: 200px;
`

const Thumbnail = ({ data }: ThumbnailProps): JSX.Element => {
  const thumbnail = getImage(data.Thumbnail_INTERNAL?.localFiles[0])

  // console.log(data.Other_language_files_INTERNAL)

  // const languageURLs: { [key: string]: string } = {}
  // data.Other_language_URLs.split('\n').forEach(row => {
  //   const [lang, url] = row.split(': ')
  //   languageURLs[lang] = url
  // })

  // console.log(languageURLs)

  // console.log(data.Resource_language)

  const languageFiles: { [key: string]: string } = {}

  if (data.Files_INTERNAL?.localFiles[0].publicURL)
    languageFiles['English'] = data.Files_INTERNAL?.localFiles[0].publicURL

  data.Other_language_files_INTERNAL?.localFiles.forEach(file => {
    const [lang] = file.name.split('_').slice(-1)
    languageFiles[lang] = file.publicURL
  })

  console.log(languageFiles)

  if (thumbnail) {
    return (
      <ThumbnailContainer>
        {thumbnail && (
          <ThumbnailShadow
            image={thumbnail}
            alt={data.Short_name + 'thumbnail image'}
            style={{
              boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.24)',
            }}
          />
        )}
        {data.Files_INTERNAL && (
          <div style={{ display: 'flex' }}>
            <Dropdown
              hover
              renderButton={(open, animDuration) => (
                <DropdownButton {...{ open, animDuration }}>
                  Download
                  {/* {Object.keys(languageFiles).length} languages */}
                </DropdownButton>
              )}
            >
              <DownloadContainer>
                {Object.entries(languageFiles).map(([lang, url]) => (
                  <p>
                    <a href={url}>{lang}</a>
                  </p>
                ))}
              </DownloadContainer>
            </Dropdown>
          </div>
        )}
      </ThumbnailContainer>
    )
  }
  return <ThumbnailContainer />
}

export default Thumbnail
