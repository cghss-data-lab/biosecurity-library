import React from 'react'
import styled from 'styled-components'

import { GatsbyImage, getImage, ImageDataLike } from 'gatsby-plugin-image'

import Dropdown from '@talus-analytics/library.ui.dropdown'

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
    URL_for_resource: string
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
  color: ${({ theme }) => theme.colorBlack} !important;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #bdd9f2;

  border: 2px solid #bdd9f2;
  box-sizing: border-box;
  box-shadow: 0px 1.5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-top: 25px;
  padding: 10px 20px;
  transition: ${({ animDuration }) => animDuration + 'ms ease'};

  ${({ open }) =>
    open &&
    `
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #9bc1e2;
    border: 2px solid #a7c6e1;
  `}
`

const DownloadLinkButton = styled.a`
  display: block;
  width: fit-content;
  color: ${({ theme }) => theme.colorBlack} !important;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #bdd9f2;

  border: 2px solid #bdd9f2;
  box-sizing: border-box;
  box-shadow: 0px 1.5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-top: 25px;
  padding: 10px 20px;

  /* &:hover {
    text-decoration: none !important;
  } */
`

const DownloadContainer = styled.div`
  padding: 15px;
  min-width: 200px;
`

const Thumbnail = ({ data }: ThumbnailProps): JSX.Element => {
  const thumbnail = getImage(data.Thumbnail_INTERNAL?.localFiles[0])

  // console.log(data.Other_language_files_INTERNAL)

  // console.log(languageURLs)

  // console.log(data.Resource_language)

  const languageFiles: { [key: string]: string } = {}

  if (data.Files_INTERNAL?.localFiles[0].publicURL)
    languageFiles['English'] = data.Files_INTERNAL?.localFiles[0].publicURL

  data.Other_language_files_INTERNAL?.localFiles.forEach(file => {
    const [lang] = file.name.split('_').slice(-1)
    languageFiles[lang] = file.publicURL
  })

  const languageURLs: { [key: string]: string } = {}
  if (Object.keys(languageFiles).length === 0) {
    if (data.URL_for_resource) languageURLs['English'] = data.URL_for_resource

    data.Other_language_URLs?.split('\n').forEach(row => {
      const [lang, url] = row.split(': ')
      languageURLs[lang] = url
    })
  }

  console.log(languageFiles)
  console.log(languageURLs)

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
        {Object.keys(languageFiles).length === 1 && (
          <DownloadLinkButton href={languageFiles.English}>
            Download
          </DownloadLinkButton>
        )}
        {Object.keys(languageFiles).length > 1 && (
          <Dropdown
            hover
            renderButton={(open, animDuration) => (
              <DropdownButton {...{ open, animDuration }}>
                Download
              </DropdownButton>
            )}
          >
            <DownloadContainer>
              {Object.entries(languageFiles).map(([lang, url]) => (
                <p key={url}>
                  <a href={url}>{lang}</a>
                </p>
              ))}
            </DownloadContainer>
          </Dropdown>
        )}
        {Object.keys(languageURLs).length === 1 && (
          <DownloadLinkButton href={languageURLs.English}>
            Access
          </DownloadLinkButton>
        )}
        {Object.keys(languageURLs).length > 1 && (
          <Dropdown
            hover
            renderButton={(open, animDuration) => (
              <DropdownButton {...{ open, animDuration }}>
                Access
              </DropdownButton>
            )}
          >
            <DownloadContainer>
              {Object.entries(languageURLs).map(([lang, url]) => (
                <p key={lang}>
                  <a href={url ?? lang}>{lang}</a>
                </p>
              ))}
            </DownloadContainer>
          </Dropdown>
        )}
      </ThumbnailContainer>
    )
  }
  return <ThumbnailContainer />
}

export default Thumbnail
