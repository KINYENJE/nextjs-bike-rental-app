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
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet'
import { FaSignOutAlt } from 'react-icons/fa'

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
    <nav className={` ${font.className} flex justify-between px-10 2xl:px-20 bg-transparent font-sans font-semibold text-lg py-4 backdrop-blur-2xl w-full z-50 text-black dark:text-white fixed 2xl:text-xl`}>
      <div>
        <Link href={`/`} className='tracking-widest bg-red-500 '>BIKEY</Link>
      </div>

      <div className='absolute left-1/2 right-1/2 hover:shadow-2xl hover:shadow-white '>
        <Themeswitcher />
      </div>
      
      <div className='gap-6 flex dark:text-dsectext items-center'> 
        {/* Avatar and dropdown */}
        {isLogged ? (
          <Sheet>
            <SheetTrigger asChild>
              <button className="rounded-full border-2 border-dgreen dark:border-dred w-10 h-10 flex items-center justify-center overflow-hidden bg-white dark:bg-black">
                {session?.user?.image ? (
                  <Image src={session.user.image} alt="avatar" width={40} height={40} className="rounded-full object-cover" />
                ) : (
                  <span className="text-xl font-bold">{session?.user?.name?.charAt(0) || "U"}</span>
                )}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-transparent bg-opacity-30 text-black dark:text-white/80 backdrop-blur-lg border border-dprimarybg shadow-lg flex flex-col justify-between p-0"
            >
              {/* Header */}
              <div className="p-6 border-b border-dgreen dark:border-dred">
                <h2 className="text-xl font-bold mb-2">Hello, {session?.user?.name?.split(" ")[0] || "User"} 👋</h2>
                <p className="text-dsectext">Welcome to BIKEY!</p>
              </div>
              {/* Sheet Content */}
              <div className="flex-1 flex flex-col gap-4 p-6">
                <Link href="/bikes" className="hover:text-dgreen dark:hover:text-dred font-semibold">Bikes</Link>
                <Link href="/profile" className="hover:text-dgreen dark:hover:text-dred font-semibold">Profile</Link>
                <Link href="/bookings" className="hover:text-dgreen dark:hover:text-dred font-semibold">My Bookings</Link>
                {isOwner && <Link className={`${isActive('/studio') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/studio">Studio</Link>}
                <Link href="/history" className="hover:text-dgreen dark:hover:text-dred font-semibold">History</Link>
                {isOwner && <Link href="/studio" className="hover:text-dgreen dark:hover:text-dred font-semibold">Studio</Link>}
                {/* Add more links as needed */}
              </div>
              {/* Footer */}
              <div className="flex items-center gap-4 p-6 border-t border-dgreen dark:border-dred">
                <div className="flex items-center gap-2">
                  {session?.user?.image ? (
                    <Image src={session.user.image} alt="avatar" width={32} height={32} className="rounded-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold">{session?.user?.name?.charAt(0) || "U"}</span>
                  )}
                  <div>
                    <div className="font-semibold">{session?.user?.name || session?.user?.email}</div>
                    <div className="text-xs text-dsectext">{session?.user?.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto text-red-600 hover:text-red-800 text-xl"
                  title="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <span className='flex items-center md:gap-4'>
            <Link className={`${isActive('/login') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white border-2 px-2 py-1 rounded border-dgreen dark:border-dred font-medium max-md:text-sm`} href="/login">Log In</Link> 
            <span className='max-md:hidden text-black dark:text-white'>
              /
            </span>
            <Link className={`${isActive('/signup') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white border-2 px-2 py-1 rounded border-dgreen dark:border-dred font-medium max-md:text-sm max-md:hidden`} href="/signup">Sign Up</Link>
          </span>
        )}
      </div>
    </nav>
  )
}

export default Navbar