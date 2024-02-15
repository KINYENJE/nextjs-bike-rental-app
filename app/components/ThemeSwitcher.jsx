import React from 'react'
import { useTheme } from 'next-themes'

const Themeswitcher = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div> 
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  )
}

export default Themeswitcher