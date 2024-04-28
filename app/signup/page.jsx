"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import { Orbitron, Syne } from 'next/font/google'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from  'next/navigation'

const font = Orbitron({weight: "800", subsets: ['latin']})
const fontSyne = Syne({weight: "400", subsets: ['latin']})



const Page = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [idPic, setIdPic] = useState('')
  const [isOwner, setIsOwner] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
      firstName,
      lastName,
      username,
      phone,
      email,
      password,
      idNumber,
      idPic,
      isOwner
    }
    console.log(user)

    const response = await fetch('https://api-bike-rental.vercel.app/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })

    const result = await response.json()
    console.log(result)

    if (result.status === 'ok') {
      toast.success('Signup successful')
      router.push('/login')
    } else if (result.message === 'Error') {
      toast.error('Signup failed')
    }
  
  }



  return (
    <section className='mx-auto container py-16 h-[100vh] flex justify-center items-center'>
      <div className=' shadow-lg bg-black w-[1080px] h-[500px] flex  '>
        <div className='bg-white w-[550px] relative flex justify-center'> 
          <h1 className={`text-white mt-14 z-30 text-2xl tracking-widest absolute ${font.className} font-medium `}>Welcome to 
          <span className='text-dgreen dark:text-dred font-extrabold'> BIKEY!</span> </h1>
          <div className='w-full z-10 absolute bg-black h-[500px] opacity-40 flex justify-center'>
            
          </div>
          <Image src={"/loginbike.jpg"} alt='login bike' width={900} height={500} className='h-full w-full object-cover object-right-top z-0 ' />
         
        </div>

        <div className='w-[730px] flex flex-col px-14 items-center justify-center '>
          
          <form className={` space-y-6 ${fontSyne.className}`} action="POST" onSubmit={handleSubmit}>
            <div className='flex w-full space-x-12'>
              <input type="text" placeholder='First Name' name='fname' id='fname' 
              value={firstName} onChange={(e) => setFirstName(e.target.value)}
              className='w-1/2 bg-black bg-opacity-10 placeholder:text-dsectext border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
              <input type="text" placeholder='Last Name' name='lname' id='lname'
              value={lastName} onChange={(e) => setLastName(e.target.value)} className='w-1/2 bg-black bg-opacity-10 placeholder:text-dsectext border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
            </div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='Username/Shop name' name='username' id='username' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <input type="tel" placeholder='Phone Number eg. 07xxx' name='phone' 
            value={phone} onChange={(e) => setPhone(e.target.value)}
            id='phone' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <input type="email" placeholder='Email Address' 
            value={email} onChange={(e) => setEmail(e.target.value)}
            name='email' id='email' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <input type="password" placeholder='Password' 
            value={password} onChange={(e) => setPassword(e.target.value)}
            name='password' id='password' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            <div className='flex w-full space-x-12'>
              <input type="text" placeholder='Nat Id No.'
              value={idNumber} onChange={(e) => setIdNumber(e.target.value)}
               name='idnumber' id='idnumber' className='w-1/3 bg-black bg-opacity-10 placeholder:text-dsectext border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
              {/** upload picture */}
              <input type="file" name="idpic"
              value={idPic} onChange={(e) => setIdPic(e.target.value)}
               id="idpic" className='w-2/3 bg-black bg-opacity-10 placeholder:text-dsectext border-dashed border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
            </div>
            <div className='w-full flex items-center gap-2'>
              <input type="checkbox" name="owner" id="owner"
              value={isOwner} onChange={(e) => setIsOwner(e.target.checked)}
               className='text-black accent-dgreen dark:accent-dred outline-none' />
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

export default Page