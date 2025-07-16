"use client"

import React, { useEffect, useState } from 'react'
import Themeswitcher from './ThemeSwitcher'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Kumbh_Sans } from 'next/font/google'
import { FaBars } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

const font = Kumbh_Sans({weight: "400", subsets: ['latin']})

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const isActive = (path) => {
    return pathname.startsWith(path)
  }

  const checkUserInfo = async () => {
    // Prefer session email if available
    let email = null
    if (session?.user?.email) {
      email = session.user.email
      setIsLogged(true)
    } else if (typeof window !== "undefined" && localStorage.getItem('token')) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
      setIsOwner(false)
      return
    }

    if (email) {
      // Use email from session for API
      const res = await fetch(`${API_URL}/api/check-user?email=${email}`)
      const data = await res.json()
      setIsOwner(data.user?.isOwner || false)
    } else {
      // fallback to token-based user info
      fetch(`${API_URL}/api/userdata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application',
          'authorization': localStorage.getItem('token')
        },
      }).then(res => res.json())
        .then(data => {
          setIsOwner(data.user?.isOwner || false)
        })
        .catch(() => setIsOwner(false))
    }
  }

  useEffect(() => {
    checkUserInfo()
  }, [session])

  const handleLogout = async () => {
    localStorage.clear()
    setShowDropdown(false)
    await signOut({ redirect: false }) // logs out NextAuth session if present
    window.location.reload()
  }

  return (
    <nav className={` ${font.className} flex justify-between px-10 bg-transparent font-sans font-semibold text-lg py-4 backdrop-blur-2xl w-full z-50 text-black dark:text-white fixed`}>
      <Link href={`/`} className='tracking-widest'>BIKEY</Link>
      <div className='absolute left-1/2 right-1/2 hover:shadow-2xl hover:shadow-white '>
        <Themeswitcher />
      </div>
      {/* hamburger menu */}
      <div className='flex items-center'>
        <FaBars className='text-2xl cursor-pointer md:hidden font-extralight' onClick={() => setIsOpen(!isOpen)} />
        <div className={`absolute rounded-lg z-50 top-16 right-0 bg-faintWhite dark:bg-faintBlack text-black backdrop-blur-xl backdrop-brightness-125 px-20 py-5 dark:text-white transition duration-700 ease-in-out border-2 border-stone-500 ${isOpen ? 'translate-x-5' : 'translate-x-80'} `}>
          <ul className='flex flex-col gap-2 divide-y-2 items-center justify-center'>
            <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/bikes' onClick={() => setIsOpen(!isOpen)}>Bikes</Link></li>
            {typeof window !== 'undefined' && localStorage.getItem('token') === null && <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/login' onClick={() => setIsOpen(!isOpen)}>Login</Link></li>}
            <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/bookings' onClick={() => setIsOpen(!isOpen)}>My Bookings</Link></li>
            {isOwner && <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/studio' onClick={() => setIsOpen(!isOpen)}>Studio</Link></li>}
            {typeof window !== 'undefined' && localStorage.getItem('token') && <li className='bg-dgreen dark:bg-dred px-6 my-2 rounded-lg' onClick={() => setIsOpen(!isOpen)}><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </div> 
      </div>
      <div className='gap-6 flex dark:text-dsectext max-md:hidden items-center'> 
        <Link className={`${isActive('/bikes') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/bikes">Bikes</Link>
        {isLogged && !isOwner && <Link className={`${isActive('/about') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/bookings">My Bookings</Link>}
        {isOwner && <Link className={`${isActive('/studio') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/studio">Studio</Link>}
        {/* Avatar and dropdown */}
        {isLogged ? (
          <div className="relative">
            <button onClick={() => setShowDropdown(!showDropdown)} className="rounded-full border-2 border-dgreen dark:border-dred w-10 h-10 flex items-center justify-center overflow-hidden bg-white dark:bg-black">
              {session?.user?.image ? (
                <Image src={session.user.image} alt="avatar" width={40} height={40} className="rounded-full object-cover" />
              ) : (
                <span className="text-xl font-bold">{session?.user?.name?.charAt(0) || "U"}</span>
              )}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-faintWhite dark:bg-faintBlack rounded-lg shadow-lg border border-dgreen dark:border-dred transition-all duration-300 z-50">
                <button onClick={handleLogout} className="w-full px-4 py-2 text-left hover:bg-dgreen hover:text-white dark:hover:bg-dred rounded-lg">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <span>
            <Link className={`${isActive('/login') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/login">Log In</Link>/
            <Link className={`${isActive('/signup') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/signup">Sign Up</Link>
          </span>
        )}
      </div>
    </nav>
  )
}

export default Navbar