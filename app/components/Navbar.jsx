"use client"

import React from 'react'
import Themeswitcher from './ThemeSwitcher'
import Link from 'next/link'
import {  usePathname } from 'next/navigation'

import { Kumbh_Sans } from 'next/font/google'


const font = Kumbh_Sans({weight: "400", subsets: ['latin']})


const Navbar = () => {
  const pathname = usePathname()

  const isActive = (path) => {
    return pathname.startsWith(path)
  }


  return (
    <nav className={` ${font.className} flex justify-between px-10  bg-transparent font-sans font-semibold text-lg  py-4 backdrop-blur-2xl w-full z-50 text-black dark:text-white fixed`}>
      <Link href={`/`} className=' tracking-widest'>BIKEY</Link>

      <div className='absolute left-1/2 right-1/2 hover:shadow-2xl hover:shadow-white '>
        <Themeswitcher />
      </div>

      <div className='gap-6 flex dark:text-dsectext'> 
      <Link className={`${isActive('/bikes') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/bikes">Bikes</Link>
        <Link className={`${isActive('/studio') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/studio">Studio</Link>
        <Link className={`${isActive('/contact') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/contact">Contact Us</Link>
        <span>
          <Link className={`${isActive('/login') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/login">Log In</Link>/
          <Link className={`${isActive('/signup') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/signup">Sign Up</Link>
        </span>
      </div>
      
    </nav>
  )
}

export default Navbar