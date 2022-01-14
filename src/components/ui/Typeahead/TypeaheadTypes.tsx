import Fuse from 'fuse.js'

export interface Item {
  key: string
  label: string
  [key: string]: any
}

export interface RenderItemProps {
  item: Item
  selected?: boolean
}

export interface TypeaheadProps {
  /** The array of items that the user should
   * be able to select from
   */
  items: Item[]
  /**
   * The currently selected items
   */
  values: Item[]
  /**
   * Function called when and item is
   * selected; the first argument will
   * be passed the selected item
   */
  onAdd: (item: Item) => void
  /**
   * Function called when and item is removed
   * from the multiselect, the first argument
   * will be the removed item.
   */
  onRemove: (item: Item) => void
  /** Toggle multi-select or single-select mode */
  multiselect?: boolean
  /**
   * Placeholder string for the search bar
   */
  placeholder?: string
  /**
   * React functional component which should be used
   * to render each item. The props passed to this
   * component will contain 'item' which is the
   * item being rendered.
   */
  RenderItem?: (props: RenderItemProps) => JSX.Element
  /**
   * The properties of the Item object which should be
   * considered in the fuzzy search. Properties for search
   * must have string values.
   */
  searchKeys?: Fuse.FuseOptionKey[]
  /**
   * className; for supporting scss modules and
   * styled-components.
   */
  className?: string
  /**
   * Toggle disabled state
   */
  disabled?: boolean
  /**
   * object of styles which will be passed
   * to the container component
   */
  style?: React.CSSProperties
  /**
   * takes an encoded SVG string to replace the icon
   * in the typeahead box. SVG can be encoded with
   * a tool like this one: https://yoksel.github.io/url-encoder/
   */
  iconSVG?: string
  /**
   * Moves the icon to the left side of the input box
   */
  iconLeft: boolean
  ariaLabel?: string
}
