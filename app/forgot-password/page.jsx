"use client"
import React, { useState } from 'react'
import { Orbitron, Syne } from 'next/font/google'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const font = Orbitron({weight: "800", subsets: ['latin']})
const fontSyne = Syne({weight: "400", subsets: ['latin']})

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const result = await response.json()

      if (result.status === 'ok') {
        toast.success('Password reset email sent! Check your inbox.')
        router.push('/login')
      } else {
        toast.error(result.message || 'Failed to send reset email')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='mx-auto container py-16 h-[100vh] flex justify-center items-center'>
      <div className='shadow-lg bg-black w-[600px] min-h-[400px] flex flex-col items-center justify-center p-8'>
        <h1 className={`text-dgreen dark:text-dred text-3xl tracking-widest ${font.className} font-medium mb-8`}>
          Forgot Password
        </h1>
        
        <form onSubmit={handleSubmit} className={`space-y-6 w-full ${fontSyne.className}`}>
          <p className='text-dsectext dark:text-dsectext text-center'>
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <input 
            type="email" 
            placeholder='Email Address' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none py-2' 
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full dark:bg-dred bg-dgreen text-black rounded-md py-2 cursor-pointer font-extrabold ${font.className} tracking-widest disabled:opacity-50`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className='flex justify-center gap-2 pt-4'>
          <p className='text-dsectext dark:text-dsectext'>Remember your password?</p>
          <Link href="/login" className='text-dgreen dark:text-dred font-medium hover:underline underline-offset-2'>
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword