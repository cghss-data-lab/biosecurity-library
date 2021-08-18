import React, { useState, useRef, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'

import {
  Container,
  SearchBar,
  Results,
  ItemButton,
  ClearSearchButton,
} from './DisplayComponents'

// API
// <TypeaheadControl items={} searchKeys={} onChange={} placeholder={} renderItem={() => <></>} />
// required item properties: {key: '', label: ''}

const TypeaheadControl = ({
  items,
  value,
  onChange,
  placeholder,
  renderItem,
  searchKeys = ['key', 'label'],
  className,
  disabled = false,
}) => {
  const [searchString, setSearchString] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef()

  // compute fuzzy search
  const fuse = useMemo(() => new Fuse(items, { keys: searchKeys }), [items])
  const results = fuse.search(searchString).map(({ item }) => item)

  // accept top result if enter is pressed
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onChange(results[0] || items[0])
      inputRef.current.blur()
      setShowResults(false)
    }
  }

  // close results onBlur, but
  // not if a button is clicked
  let blurTimeout
  const onBlurHandler = () => {
    // set it to close next tick
    blurTimeout = setTimeout(() => {
      setShowResults(false)
      if (value === '') setSearchString('')
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
    if (disabled && value === '') setSearchString('')
  }, [disabled])

  return (
    <Container
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      className={className}
    >
      <SearchBar
        disabled={disabled}
        type="search"
        autoComplete="special-auto-fill"
        name="special-auto-fill"
        ref={inputRef}
        onKeyPress={handleKeyPress}
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
        placeholder={placeholder}
      />
      <ClearSearchButton
        // need to prevent focus from propagating up to
        // the container component and opening the dropdown
        onFocus={e => e.stopPropagation()}
        onClick={() => {
          if (searchString !== '') {
            setShowResults(false)
            setSearchString('')
            onChange(undefined)
          }
        }}
        searchString={searchString}
      />

      <Results style={{ display: showResults ? 'flex' : 'none' }}>
        {((results.length > 0) & (searchString !== value?.label)
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
            {renderItem(item)}
          </ItemButton>
        ))}
      </Results>
    </Container>
  )
}

export default TypeaheadControl
