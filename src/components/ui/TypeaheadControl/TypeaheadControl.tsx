import React, { useState, useRef, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'

import {
  Container,
  SearchBar,
  Results,
  ItemButton,
  SearchIcon,
  Selected,
  SelectedItem,
} from './DisplayComponents'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'
import { useTheme } from 'styled-components'

export interface Item {
  key: string
  label: string
  [key: string]: any
}

interface TypeaheadControlProps {
  multiselect?: boolean
  items: Item[]
  values: Item[]
  onAdd: (item: Item) => void
  onRemove: (item: Item) => void
  placeholder: string
  RenderItem: React.FC<{ item: Item }>
  searchKeys?: Fuse.FuseOptionKey[]
  className?: string
  disabled?: boolean
}

const TypeaheadControl: React.FC<TypeaheadControlProps> = ({
  multiselect,
  items,
  values,
  onAdd,
  onRemove,
  placeholder,
  RenderItem,
  searchKeys = ['key', 'label'],
  className,
  disabled = false,
}) => {
  const theme: any = useTheme()
  const [searchString, setSearchString] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // compute fuzzy search
  const fuse = useMemo(
    () => new Fuse(items, { keys: searchKeys }),
    [items, searchKeys]
  )
  const results = fuse.search(searchString).map(({ item }) => item)

  // accept top result if enter is pressed
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onAdd(results[0] || items[0])
      inputRef.current!.blur()
      setShowResults(false)
    }
  }

  // close results onBlur, but
  // not if a button is clicked
  let blurTimeout: ReturnType<typeof setTimeout>
  const onBlurHandler = () => {
    // set it to close next tick
    blurTimeout = setTimeout(() => {
      setShowResults(false)
      if (!values) setSearchString('')
    })
  }

  // if focus is inside the container,
  // cancel the timer, don't close it
  const onFocusHandler = () => {
    clearTimeout(blurTimeout)
    setShowResults(true)
    inputRef.current!.focus()
  }

  useEffect(() => {
    if (values && !multiselect) setSearchString(values[0].label)
  }, [values, multiselect])

  useEffect(() => {
    if (disabled && !values) setSearchString('')
  }, [disabled, values])

  return (
    <Container
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      className={className}
      onSubmit={e => e.preventDefault()}
    >
      <SearchBar
        disabled={disabled}
        type="search"
        autoComplete="off"
        name="special-auto-fill"
        ref={inputRef}
        onKeyPress={handleKeyPress}
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
        placeholder={placeholder}
      />
      <SearchIcon searchString={searchString} />

      <Results style={{ display: showResults ? 'flex' : 'none' }}>
        {multiselect && values.length > 0 && (
          <Selected>
            {values.map((item: Item) => (
              <SelectedItem onClick={() => onRemove(item)}>
                {item.label}
                <AirtableCMSIcon
                  name="Remove"
                  color={theme.colorBlack}
                  style={{ flexShrink: 0 }}
                />
              </SelectedItem>
            ))}
          </Selected>
        )}
        {(results.length > 0 && searchString !== values[0]?.label
          ? results
          : items
        ).map(item => (
          <ItemButton key={item.key} onClick={() => onAdd(item)}>
            <RenderItem {...{ item }} />
          </ItemButton>
        ))}
      </Results>
    </Container>
  )
}

export default TypeaheadControl
