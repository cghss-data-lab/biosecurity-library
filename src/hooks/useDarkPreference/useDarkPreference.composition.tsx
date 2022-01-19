import React from 'react'
import useDarkPreference from '.'

export const useDarkPreferenceExample = () => {
  const userPrefersDark = useDarkPreference()

  const someStyles = {
    backgroundColor: userPrefersDark ? '#282C34' : 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 100,
  }

  return <div style={someStyles}>{userPrefersDark ? '🌚' : '🌝'}</div>
}
