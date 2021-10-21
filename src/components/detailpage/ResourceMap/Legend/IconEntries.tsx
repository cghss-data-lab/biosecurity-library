import React from 'react'
import { Icon } from '../ResourceMap'
import Entry from './Entry'

export const IconEntries = ({ icons }: { icons: Icon[] }) => {
  return (
    <>
      {icons.map(icon => (
        <IconEntry value={icon.data.Name} />
      ))}
    </>
  )
}

// TODO rename IconEntry and Entry so they're rationally named
export const IconEntry = (props: {
  label?: string
  value: string
  color?: string
}) => {
  return (
    <Entry
      {...props}
      label={props.label !== undefined ? props.label : props.value}
    />
  )
}
export default IconEntries
