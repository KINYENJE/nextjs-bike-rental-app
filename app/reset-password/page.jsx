"use client"
import React, { useState, useEffect } from 'react'
import { Orbitron, Syne } from 'next/font/google'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'

const font = Orbitron({weight: "800", subsets: ['latin']})
const fontSyne = Syne({weight: "400", subsets: ['latin']})

function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      toast.error('Invalid reset link')
      router.push('/login')
    }
  }, [searchParams, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${API_URL}/api/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      })

      const result = await response.json()

      if (result.status === 'ok') {
        toast.success('Password reset successful! Please log in.')
        router.push('/login')
      } else {
        toast.error(result.message || 'Failed to reset password')
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
          Reset Password
        </h1>
        
        <form onSubmit={handleSubmit} className={`space-y-6 w-full ${fontSyne.className}`}>
          <input 
            type="password" 
            placeholder='New Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none py-2' 
          />
          
          <input 
            type="password" 
            placeholder='Confirm New Password' 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            className='w-full bg-black bg-opacity-10 placeholder:text-dsectext placeholder:text-center border-2 border-dsectext rounded-md focus:dark:border-dred focus:border-dgreen outline-none py-2' 
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className={`w-full dark:bg-dred bg-dgreen text-black rounded-md py-2 cursor-pointer font-extrabold ${font.className} tracking-widest disabled:opacity-50`}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>

        <div className='flex justify-center gap-2 pt-4'>
          <Link href="/login" className='text-dgreen dark:text-dred font-medium hover:underline underline-offset-2'>
            Back to Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}