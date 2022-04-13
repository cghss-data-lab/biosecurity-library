import Tippy from '@tippyjs/react'
import React from 'react'
import styled from 'styled-components'

interface LanguageListProps {
  languages: string[] | undefined
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

const LanguageList = ({
  languages,
  languageFiles,
  languageURLs,
}: LanguageListProps) => {
  if (!languages || languages.length === 0)
    languages =
      Object.keys(languageFiles).length > 0
        ? Object.keys(languageFiles)
        : Object.keys(languageURLs)

  let list = ''
  if (languages.length === 1) list = languages[0]
  if (languages.length <= 3) list = languages.slice(0, 3).join(', ')
  if (languages.length > 3) list = languages.slice(0, 3).join(', ') + '...'

  const tooltip = (
    <div>
      {languages.map(lang => (
        <div style={{ padding: 5 }}>{lang}</div>
      ))}
    </div>
  )

  if (languages.length > 3)
    return (
      <Tippy content={tooltip} theme={'light'} placement={'bottom-end'}>
        <ListParagraph>
          {languages.length === 1 ? 'Language: ' : 'Languages: '} {list}{' '}
          {languages.length > 3 && `(${languages.length})`}
        </ListParagraph>
      </Tippy>
    )

  return (
    <ListParagraph>
      {languages.length === 1 ? 'Language: ' : 'Languages: '} {list}{' '}
      {languages.length > 3 && `(${languages.length})`}
    </ListParagraph>
  )
}

export default LanguageList
