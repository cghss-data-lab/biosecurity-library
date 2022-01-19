/**
 * List of resource map icon entries
 */
import React from 'react'
import { Icon } from '../ResourceMap'
import AirtableIconEntry from './AirtableIconEntry'
import { Frameable } from './legendTypes'
import * as object from '../../../../../utilities/object'

interface IconEntriesProps {
  /**
   * List of icon definitions.
   */
  icons: Icon[]
  /**
   * Optional: Sort icons by name, A-Z? Defaults to true.
   */
  sorted?: boolean
}

export const IconEntries = (props: IconEntriesProps) => {
  const icons: Icon[] =
    props.sorted !== false
      ? props.icons.sort(object.sortByCustom<Icon>(inst => inst.name))
      : props.icons
  return (
    <>
      {icons.map(icon => (
        <IconEntry value={icon.name} />
      ))}
    </>
  )
}

type IconEntryProps =
  | {
      label?: string
      value: string
      color?: string
    } & Frameable

// TODO rename IconEntry and Entry so they're rationally named
export const IconEntry = (props: IconEntryProps) => {
  return (
    <AirtableIconEntry
      {...props}
      label={props.label !== undefined ? props.label : props.value}
    />
  )
}

export default IconEntries
