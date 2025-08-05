"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Orbitron, Syne } from 'next/font/google'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from  'next/navigation'
import { FcGoogle } from "react-icons/fc";
import { useSession, signIn, signOut } from 'next-auth/react';

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

  const { data: session } = useSession();

  const isAlreadyUser = !!session?.user;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (session?.user) {
      // check if user exists in db using the email and update the relevant fields if not update field with session data
      try {
        fetch(`${API_URL}/api/check-user?email=${session.user.email}`)
          .then(res => res.json())
          .then(data => {
            if (data.exists) {
              setFirstName(data.user.firstName || '');
              setLastName(data.user.lastName || '');
              setUsername(data.user.username || '');
              setPhone(data.user.phone || '');
              setEmail(session.user.email);
              setIdNumber(data.user.idNumber || '');
              setIsOwner(data.user.isOwner || false);
            } else {
              setEmail(session.user.email);
              setFirstName(session.user.name?.split(' ')[0] || '');
              setLastName(session.user.name?.split(' ')[1] || '');
              setUsername(session.user.name || '');
            }
          });
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error('Failed to fetch user data. Please try again later.');     
      }
      
    }
  }, [session]);

  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('username', username);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('idNumber', idNumber);
    formData.append('isOwner', isOwner);
    if (!isAlreadyUser) {
      formData.append('password', password);
    }

    // Get the file from the input
    const fileInput = document.getElementById('idpic');
    if (fileInput && fileInput.files && fileInput.files[0]) {
      formData.append('idPic', fileInput.files[0]);
    }

    const user = formData;
    console.log(user)

    const response = await fetch(`${API_URL}/api/signup`, {
      method: 'POST',
      
      body: formData,
    })

    const result = await response.json()
    console.log(result)

    if (result.status === 'ok') {
      toast.success('Signup successful')
      router.push('/login')
    } else if (result.message === 'Error') {
      toast.error(`Signup failed: ${result.error || 'Check your details and try again'}`);
    } else {
      toast.error(result.message)
    }
  
  }



  return (
    <section className='mx-auto container py-16 h-[100vh] flex justify-center items-center'>
      <div className=' shadow-lg bg-black w-[1080px] p-4 flex  '>
        <div className='bg-white w-[550px] relative flex justify-center'> 
          <h1 className={`text-white mt-14 z-30 text-2xl tracking-widest absolute ${font.className} font-medium `}>Welcome to 
          <span className='text-dgreen dark:text-dred font-extrabold'> BIKEY!</span> </h1>
          <div className='w-full z-10 absolute bg-black h-[500px] opacity-40 flex justify-center'>
            
          </div>
          <Image src={"/loginbike.jpg"} alt='login bike' width={900} height={500} className='h-full w-full object-cover object-right-top z-0 ' />
         
        </div>

        <div className='w-[730px] flex flex-col px-14 items-center justify-center '>
          {isAlreadyUser && (
            <button
              type="button"
              onClick={() => router.push('/')}
              className={`mb-4 w-full py-2 rounded-md bg-dgreen dark:bg-dred text-black font-bold hover:bg-dgreen/80 transition-colors ${font.className}`}
            >
              Proceed to Homepage
            </button>
          )}

          <button
            type="button"
            onClick={() => signIn("google")}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-md bg-white border border-dsectext hover:bg-dgreen hover:text-white transition-colors font-bold dark:text-black hover:dark:bg-dred ${font.className}`}
          >
            <FcGoogle className='text-2xl' />
            Sign Up with Google
          </button>

          {/* Or  */}
          <div className='w-full flex items-center justify-between my-6'>
            <hr className='w-[45%] border-dsectext dark:border-dsectext' />
            <span className='text-dsectext dark:text-dsectext'>OR</span>
            <hr className='w-[45%] border-dsectext dark:border-dsectext' />
          </div>
          
          <form className={` space-y-6 text-faintWhite ${fontSyne.className}`} action="POST" onSubmit={handleSubmit}>
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
            {!isAlreadyUser && (
              <input type="password" placeholder='Password' 
              value={password} onChange={(e) => setPassword(e.target.value)}
              name='password' id='password' className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none ' />
            )}
            <div className='flex w-full space-x-12'>
              <input type="text" placeholder='Nat Id No.'
              value={idNumber} onChange={(e) => setIdNumber(e.target.value)}
               name='idnumber' id='idnumber' className='w-1/3 bg-black bg-opacity-10 placeholder:text-dsectext border-2 border-dsectext rounded-md placeholder:text-center focus:dark:border-dred focus:border-dgreen outline-none ' />
              {/** upload picture */}
              <input type="file" name="idpic" accept='image/*'
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