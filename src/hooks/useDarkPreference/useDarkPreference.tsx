import { useEffect, useState } from 'react'

const useDarkPreference = () => {
  const [prefersDark, setPrefersDark] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      // function to check prefers-color-scheme query
      const checkPrefersDark = () => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches)
          setPrefersDark(true)
        else setPrefersDark(false)
      }

      // run the check on mount
      checkPrefersDark()

      // create our query
      const query = window.matchMedia('(prefers-color-scheme: dark)')
      // attach event listener
      query.addEventListener('change', checkPrefersDark)

      // clean up event listener on component unmount
      return () => query.removeEventListener('change', checkPrefersDark)
    }
  }, [])

  return prefersDark
}

export default useDarkPreference
