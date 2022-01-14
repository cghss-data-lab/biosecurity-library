import React, { useState, useRef, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'

import {
  Container,
  SearchBar,
  Results,
  ItemButton,
  SearchIcon,
  Selected,
} from './DisplayComponents'

import TypeaheadResult from './TypeaheadResult'
import Expander from '@talus-analytics/library.ui.expander'

import type { TypeaheadProps, Item } from './TypeaheadTypes'

const Typeahead = ({
  multiselect = false,
  items,
  values,
  onAdd,
  onRemove,
  placeholder = '',
  RenderItem = ({ item, selected }) => (
    <TypeaheadResult {...{ item, selected }} />
  ),
  searchKeys = ['key', 'label'],
  iconSVG,
  iconLeft = false,
  className = '',
  disabled = false,
  style = {},
  ariaLabel = '',
}: TypeaheadProps) => {
  if (!items) throw new Error('Item array in multiselect cannot be undefined')

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
      if (results[0] || items[0]) onAdd(results[0] || items[0])
      inputRef.current!.blur()
      setShowResults(false)
      setSearchString('')
    }
  }

  // close results onBlur, but
  // not if a button is clicked
  let blurTimeout: ReturnType<typeof global.setTimeout>
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
    if (values.length > 0 && !multiselect) setSearchString(values[0]?.label)
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
      style={style}
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
        aria-label={ariaLabel}
        iconLeft={iconLeft}
      />
      <SearchIcon searchString={searchString} {...{ iconSVG, iconLeft }} />
      <Expander
        floating
        open={showResults}
        style={{ width: '100%' }}
        animDuration={125}
      >
        <Results>
          {multiselect && values.length > 0 && (
            <Selected>
              {values.map((item: Item) => (
                <ItemButton key={item.key} onClick={() => onRemove(item)}>
                  <RenderItem selected key={item.key} {...{ item }} />
                </ItemButton>
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
      </Expander>
    </Container>
  )
}

export default Typeahead
