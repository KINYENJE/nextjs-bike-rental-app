"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Orbitron, Syne } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'
import { useSession , signIn} from 'next-auth/react';

const font = Orbitron({weight: "800", subsets: ['latin']})
const fontSyne = Syne({weight: "400", subsets: ['latin']})

const Page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data: session } = useSession();


   useEffect(() => {
    if (session?.user?.email) {
      console.log("User is logged in:", session);
      // Check if google user exists in your backend
      fetch(`${API_URL}/api/check-user?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data.exists) {
            router.push('/');
          } else {
            router.push('/signup');
          }
        });
    }
  }, [session, router]);


  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     router.push('/')
  //   }
  
  // }, [router])

  // // clear local storage after  60 minutes
  // setTimeout(() => {
  //   localStorage.clear()
  // }, 3600000)

  
  



  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   const user = {
  //     email,
  //     password
  //   }
  //   console.log(user)

  //   const response = await fetch(`${API_URL}/api/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(user)
  //   })

  //   const result = await response.json()
  //   console.log(result)

  //   if (result.status === 'ok') {
  //     localStorage.setItem('token', result.token)
  //     toast.success('Login successful')
  //     window.location.reload()
  //     router.push('/')
  //   } else if (result.message === 'Error') {
  //     toast.error('Login failed')
  //   }
  // }

  
  const handleLogin = async (e) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result.ok) {
      toast.success('Login successful');
      // navigate back to previous page
      router.push('/');
    } else if (result.error) {
      toast.error(result.error);
    } else {
      toast.error('Login failed');
    }
  };


  return (
    <section className='mx-auto container py-16 h-[100vh] flex justify-center items-center'>
      <div className=' shadow-lg bg-black w-[1080px] min-h-[500px] flex mt-10 '>
        <div className='bg-white w-[550px] relative flex justify-center'> 
          <h1 className={`text-white mt-14 z-30 text-2xl tracking-widest absolute ${font.className} font-medium `}>Welcome back to 
          <span className='text-dgreen dark:text-dred font-extrabold'> BIKEY!</span> </h1>
          <div className='w-full z-10 absolute bg-black min-h-[500px] opacity-40 flex justify-center'>
            
          </div>
          <Image src={"/loginbike.jpg"} alt='login bike' width={900} height={500} className='h-full w-full object-cover object-right-top z-0 ' />
         
        </div>

        <div className='w-auto flex flex-col px-14 items-center justify-center '>

          <button
            type="button"
            onClick={() => signIn("google")}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-md bg-white border border-dsectext hover:bg-dgreen hover:text-white transition-colors font-bold dark:text-black hover:dark:bg-dred ${font.className} mb-4`}
          >
            <FcGoogle className='text-2xl' />
            Sign In with Google
          </button>
          {/* Or  */}
          <div className='w-full flex items-center justify-between my-6'>
            <hr className='w-[45%] border-dsectext dark:border-dsectext' />
            <span className='text-dsectext dark:text-dsectext'>OR</span>
            <hr className='w-[45%] border-dsectext dark:border-dsectext' />
          </div>
          
          <form onSubmit={handleLogin} action="POST" className={` space-y-6 ${fontSyne.className}`}>

            <h1 className={`text-dgreen dark:text-dred text-2xl tracking-widest ${font.className} font-medium  `}>Sign In</h1>
            <p className='text-dsectext dark:text-dsectext pb-4'>Enter your details to sign in</p>

            <input type="email" placeholder='Email Address' name='email' id='email'
            value={email} onChange={(e) => setEmail(e.target.value)}
             className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none py-2' />
            <input type="password" placeholder='Password' name='password' id='password' 
            value={password} onChange={(e) => setPassword(e.target.value)}
            className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none py-2 ' />
            
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

export default Page