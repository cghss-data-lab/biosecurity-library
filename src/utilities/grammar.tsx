import React from 'react'

export const commaSeparatedList = (strings: string[]) => {
  if (!strings) return undefined
  if (strings.length === 1) return strings[0]
  const list = strings.slice(0, -1).join(', ')
  const last = strings[strings.length - 1]
  const oxfordComma = strings.length > 2 ? ',' : ''
  return `${list}${oxfordComma} and ${last}`
}

export const commaSeparatedElements = (elements: React.ReactNode[]) => {
  if (!elements) return undefined
  if (elements.length === 1) return elements[0]
  const withCommas: React.ReactNode[] = []
  for (const element of elements.slice(0, -1)) {
    withCommas.push(element)
    withCommas.push(<>, </>)
  }
  withCommas.pop()
  const oxfordComma = elements.length > 2
  if (oxfordComma) withCommas.push(<>, </>)
  const last = elements[elements.length - 1]
  withCommas.push(<> and </>)
  withCommas.push(last)
  return withCommas
}
