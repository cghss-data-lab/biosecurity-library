/**
 * List of resource map icon entries
 */
import React from 'react'
import { Icon } from '../ResourceMap'
import AirtableIconEntry from './AirtableIconEntry'
import { Frameable } from './legendTypes'

export const IconEntries = ({ icons }: { icons: Icon[] }) => {
  return (
    <>
      {icons.map(icon => (
        <IconEntry value={icon.data.Name} />
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
