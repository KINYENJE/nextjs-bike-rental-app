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
          <h1 className={`text-white mt-14 z-30 text-2xl tracking-widest absolute ${font.className} font-medium `}>Welcome to 
          <span className='text-dgreen dark:text-dred font-extrabold'> BIKEY!</span> </h1>
          <div className='w-full z-10 absolute bg-black h-[500px] opacity-40 flex justify-center'>
            
          </div>
          <Image src={"/loginbike.jpg"} alt='login bike' width={900} height={500} className='h-full w-full object-cover object-right-top z-0 ' />
         
        </div>

        <div className='w-[730px] flex flex-col px-14 items-center justify-center '>
          
          <form className={` space-y-6 ${fontSyne.className}`}>
            <div className='flex w-full space-x-12'>
              <input type="text" placeholder='First Name' name='fname' id='fname' className='w-1/2 bg-black bg-opacity-10 placeholder:text-dsectext border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
              <input type="text" placeholder='Last Name' name='lname' id='lname' className='w-1/2 bg-black bg-opacity-10 placeholder:text-dsectext border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
            </div>
            <input type="text" placeholder='Username/Shop name' name='username' id='username' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <input type="tel" placeholder='Phone Number eg. 07xxx' name='phone' id='phone' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <input type="email" placeholder='Email Address' name='email' id='email' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <input type="password" placeholder='Password' name='password' id='password' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <div className='flex w-full space-x-12'>
              <input type="text" placeholder='Nat Id No.' name='idnumber' id='idnumber' className='w-1/3 bg-black bg-opacity-10 placeholder:text-dsectext border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
              {/** upload picture */}
              <input type="file" name="idpic" id="idpic" className='w-2/3 bg-black bg-opacity-10 placeholder:text-dsectext border-dashed border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
            </div>
            <div className='w-full flex items-center gap-2'>
              <input type="checkbox" name="owner" id="owner" />
              <label htmlFor="owner" className='text-dsectext dark:text-dsectext'>I am a bike owner</label>
            </div>
            <input type="submit" value="Sign Up" className={`w-full dark:bg-dred bg-dgreen  text-black rounded-md py-2 cursor-pointer font-extrabold ${font.className} tracking-widest`} />
          </form>

          <div className='flex justify-center gap-2 pt-4'>
            <p className='text-dsectext dark:text-dsectext'>Already have an account?</p>
            <Link href="/login" className='text-dgreen dark:text-dred font-medium hover:underline underline-offset-2'>Log In</Link>
          </div>
        </div>
       
      </div>
    </section>
  )
}

export default page