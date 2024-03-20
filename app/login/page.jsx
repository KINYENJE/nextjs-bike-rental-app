import Image from 'next/image'
import React from 'react'
import { Orbitron, Syne } from 'next/font/google'
import Link from 'next/link'

const font = Orbitron({weight: "800", subsets: ['latin']})
const fontSyne = Syne({weight: "400", subsets: ['latin']})

const page = () => {
  return (
    <section className='mx-11 py-16 h-[100vh] flex justify-center items-center'>
      <div className=' shadow-lg bg-black w-[1080px] h-[500px] flex mt-10 '>
        <div className='bg-white w-[550px] relative flex justify-center'> 
          <h1 className={`text-white mt-14 z-30 text-2xl tracking-widest absolute ${font.className} font-medium `}>Welcome back to 
          <span className='text-dgreen dark:text-dred font-extrabold'> BIKEY!</span> </h1>
          <div className='w-full z-10 absolute bg-black h-[500px] opacity-40 flex justify-center'>
            
          </div>
          <Image src={"/loginbike.jpg"} alt='login bike' width={900} height={500} className='h-full w-full object-cover object-right-top z-0 ' />
         
        </div>

        <div className='w-[730px] flex flex-col px-14 items-center justify-center '>
          
          <form className={` space-y-6 ${fontSyne.className}`}>

            <h1 className={`text-dgreen dark:text-dred text-2xl tracking-widest ${font.className} font-medium  `}>Sign In</h1>
            <p className='text-dsectext dark:text-dsectext pb-4'>Enter your details to sign in</p>

            <input type="email" placeholder='Email Address' name='email' id='email' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none py-2' />
            <input type="password" placeholder='Password' name='password' id='password' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none py-2 ' />
            
            <input type="submit" value="Sign In" className={`w-full dark:bg-dred bg-dgreen  text-black rounded-md py-2 cursor-pointer font-extrabold ${font.className} tracking-widest`} />
          </form>

          <div className='flex justify-center gap-2 pt-4'>
            <p className='text-dsectext dark:text-dsectext'>Don&apos;t have an account?</p>
            <Link href="/login" className='text-dgreen dark:text-dred font-medium hover:underline underline-offset-2'>Sign Up</Link>
          </div>
        </div>
       
      </div>
    </section>
  )
}

export default page