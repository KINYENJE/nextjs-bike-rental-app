"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { LuLightbulb, LuLightbulbOff } from "react-icons/lu";


const Themeswitcher = () => {
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div> 
      
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <LuLightbulbOff /> : <LuLightbulb />}
      </button>
    </div>
  )
}

export default Themeswitcher