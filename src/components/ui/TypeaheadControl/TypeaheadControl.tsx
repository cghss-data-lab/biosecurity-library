import React, { useState, useRef, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'

import {
  Container,
  SearchBar,
  Results,
  ItemButton,
  SearchIcon,
} from './DisplayComponents'

export interface Item {
  key: string
  label: string
  [key: string]: any
}

interface TypeaheadControlProps {
  items: Item[]
  value: Item | undefined
  onChange: (item?: Item) => void
  placeholder: string
  RenderItem: React.FC<{ item: Item }>
  searchKeys?: Fuse.FuseOptionKey[]
  className?: string
  disabled?: boolean
}

const TypeaheadControl: React.FC<TypeaheadControlProps> = ({
  items,
  value,
  onChange,
  placeholder,
  RenderItem,
  searchKeys = ['key', 'label'],
  className,
  disabled = false,
}) => {
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
      onChange(results[0] || items[0])
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
      if (!value) setSearchString('')
    })
  }

  // if focus is inside the container,
  // cancel the timer, don't close it
  const onFocusHandler = () => {
    clearTimeout(blurTimeout)
    setShowResults(true)
  }

  useEffect(() => setSearchString((value && value.label) || ''), [value])

  useEffect(() => {
    if (disabled && !value) setSearchString('')
  }, [disabled, value])

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
        {(results.length > 0 && searchString !== value?.label
          ? results
          : items
        ).map(item => (
          <ItemButton
            key={item.key}
            onClick={() => {
              setShowResults(false)
              onChange(item)
            }}
          >
            <RenderItem {...{ item }} />
          </ItemButton>
        ))}
      </Results>
    </Container>
  )
}

export default TypeaheadControl
