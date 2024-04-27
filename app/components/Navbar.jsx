"use client"

import React, { useEffect, useState } from 'react'
import Themeswitcher from './ThemeSwitcher'
import Link from 'next/link'
import {  usePathname } from 'next/navigation'

import { Kumbh_Sans } from 'next/font/google'
// import { useRouter } from 'next/navigation'
// hamburger menu from react-icons
import { FaBars } from 'react-icons/fa'



const font = Kumbh_Sans({weight: "400", subsets: ['latin']})


const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [isOwner, setIsOwner] = useState(false)
  const [isLogged, setIsLogged] = useState(false)

  const pathname = usePathname()

  const isActive = (path) => {
    return pathname.startsWith(path)
  }

  
  const checkUserInfo = () => {

    fetch('http://localhost:5000/api/userdata', {
      method: 'GET',
      headers: {
        'Content-Type': 'application',
        'authorization': localStorage.getItem('token')
      },
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        setIsOwner(data.user.isOwner)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    // check if user is logged in
    if (typeof window !== "undefined" && localStorage.getItem('token')) { 
      setIsLogged(true)
      checkUserInfo()
    } else {
      setIsLogged(false)
    }
  }, [])



  const handleLogout = () => {
    localStorage.clear()
    window.location.reload() // reload site after logout
  }


  return (
    <nav className={` ${font.className} flex justify-between px-10  bg-transparent font-sans font-semibold text-lg  py-4 backdrop-blur-2xl w-full z-50 text-black dark:text-white fixed`}>
      <Link href={`/`} className=' tracking-widest'>BIKEY</Link>

      <div className='absolute left-1/2 right-1/2 hover:shadow-2xl hover:shadow-white '>
        <Themeswitcher />
      </div>

      {/* hamburger menu */}
      <div className='flex items-center'>
        <FaBars className='text-2xl cursor-pointer md:hidden font-extralight' onClick={() => setIsOpen(!isOpen)} />

        <div className={`absolute rounded-lg z-50 top-16 right-0 bg-faintWhite dark:bg-faintBlack  text-black backdrop-blur-xl backdrop-brightness-125 px-20 py-5  dark:text-white transition duration-700  ease-in-out border-2 border-stone-500  ${isOpen ? 'translate-x-5' : 'translate-x-80'} `}>
          <ul className='flex flex-col gap-2 divide-y-2 items-center justify-center'>
            
            <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/bikes' onClick={() => setIsOpen(!isOpen)}>Bikes</Link></li>
            {typeof window !== 'undefined' && localStorage.getItem('token') === null && <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/login' onClick={() => setIsOpen(!isOpen)}>Login</Link></li>}
            {/* <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/about'>About</Link></li>
            <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/contact'>Contact</Link></li> */}
            <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/bookings' onClick={() => setIsOpen(!isOpen)}>My Bookings</Link></li>
            {isOwner && <li className='hover:bg-dgreen dark:hover:bg-dred'><Link href='/studio' onClick={() => setIsOpen(!isOpen)}>Studio</Link></li>}
            {typeof window !== 'undefined' && localStorage.getItem('token') && <li className='bg-dgreen dark:bg-dred px-6 my-2 rounded-lg' onClick={() => setIsOpen(!isOpen)}><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </div> 
        
      </div>

      <div className='gap-6 flex dark:text-dsectext max-md:hidden'> 
      <Link className={`${isActive('/bikes') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/bikes">Bikes</Link>
      {isLogged && !isOwner && <Link className={`${isActive('/about') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/bookings">My Bookings</Link>}
        {isOwner && <Link className={`${isActive('/studio') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/studio">Studio</Link>}
        {/* <Link className={`${isActive('/contact') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/contact">Contact Us</Link> */}
        {typeof window !== 'undefined' && localStorage.getItem('token') ?  
        <button onClick={handleLogout} className='bg-dgreen dark:bg-dred font-medium  rounded-lg px-2  capitalize text-black'>Logout</button> : <span>
          <Link className={`${isActive('/login') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/login">Log In</Link>/
          <Link className={`${isActive('/signup') ? 'text-dgreen dark:text-dred' : 'text-black dark:text-white'} hover:dark:text-white hover:text-dgreen hover:shadow-2xl hover:shadow-white`} href="/signup">Sign Up</Link>
        </span>
        }
        
      </div>
      
    </nav>
  )
}

export default Navbar