import React from 'react'
import { useTheme } from 'styled-components'

const ResourceContainer: React.FC<{ expanded: boolean }> = ({
  expanded,
  children,
}) => {
  // There appears to be a bug with attribute updating
  // right after rehydration on page load, so this component
  // sidesteps reconciliation by changing from a div to a
  // span, which means all subtrees past that point (like the
  // style attribute object) are dropped instead of compared.
  const theme: any = useTheme()
  if (expanded) {
    return (
      <div
        style={{
          background: theme.colorVeryLightGray,
          padding: 20,
          display: 'grid',
          gap: 15,
          gridTemplateAreas: `
            'image title author users summary'
            'image icons author users summary'`,
          gridTemplateColumns: `100px 250px 180px 250px auto`,
          borderBottom: `1px solid ${theme.colorMedGray}`,
        }}
      >
        {children}
      </div>
    )
  }

  return (
    <span
      style={{
        display: 'block',
        background: theme.colorVeryLightGray,
        padding: 20,
        gap: 15,
        gridTemplateAreas: `  
          'title'
          'author'
          'icons'`,
        gridTemplateRows: 'min-content 1fr',
        borderBottom: `1px solid ${theme.colorMedGray}`,
      }}
    >
      {children}
    </span>
  )
}

export default ResourceContainer
