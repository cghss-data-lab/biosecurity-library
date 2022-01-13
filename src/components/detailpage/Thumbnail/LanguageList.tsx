import React from 'react'
import styled from 'styled-components'

interface LanguageListProps {
  languageFiles: {
    [key: string]: string
  }
  languageURLs: {
    [key: string]: string
  }
}

const ListParagraph = styled.p`
  padding-top: 1em;
`

const LanguageList = ({ languageFiles, languageURLs }: LanguageListProps) => {
  const languages =
    Object.keys(languageFiles).length > 0
      ? Object.keys(languageFiles)
      : Object.keys(languageURLs)

  let list = ''
  if (languages.length === 1) list = languages[0]
  if (languages.length <= 3) list = languages.slice(0, 3).join(', ')
  if (languages.length > 3) list = languages.slice(0, 3).join(', ') + '...'

  return (
    <ListParagraph>
      {languages.length === 1 ? 'Language: ' : 'Languages: '} {list}{' '}
      {languages.length > 3 && `(${languages.length})`}
    </ListParagraph>
  )
}

export default LanguageList
