"use client"

import React, { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Tourney, Syne } from 'next/font/google'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import { FiLoader } from 'react-icons/fi'

const fontTourney = Tourney({ weight: "600", subsets: ['latin'] })
const fontSyne = Syne({ weight: "400", subsets: ['latin'] })

const PaymentStatus = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const searchParams = useSearchParams()
  const ref = searchParams.get('ref')

  // 'checking' | 'paid' | 'pending' | 'failed' | 'error'
  const [state, setState] = useState('checking')
  const [amount, setAmount] = useState(null)

  useEffect(() => {
    if (!ref) {
      setState('error')
      return
    }

    let cancelled = false
    let attempts = 0

    // Confirmation arrives via IntaSend's webhook, which can lag a few seconds
    // behind the redirect (especially for M-Pesa). Poll our backend until it
    // reports paid, then fall back to "still processing" after ~30s.
    const check = async () => {
      try {
        const res = await fetch(`${API_URL}/api/payments/verify?ref=${encodeURIComponent(ref)}`)
        const data = await res.json()
        if (cancelled) return

        if (data.status !== 'ok') {
          setState('error')
          return
        }

        setAmount(data.amount)

        if (data.paymentStatus === 'paid') {
          setState('paid')
        } else if (data.paymentStatus === 'failed') {
          setState('failed')
        } else if (attempts < 10) {
          attempts++
          setTimeout(check, 3000)
        } else {
          setState('pending')
        }
      } catch (err) {
        if (!cancelled) setState('error')
      }
    }

    check()
    return () => { cancelled = true }
  }, [ref, API_URL])

  const content = {
    checking: {
      icon: <FiLoader className="text-5xl text-dgreen dark:text-dred animate-spin" />,
      title: 'Confirming your payment…',
      body: 'Hang tight while we check with the payment provider.',
    },
    paid: {
      icon: <FaCheckCircle className="text-5xl text-emerald-500" />,
      title: 'Payment successful',
      body: amount ? `Your booking is confirmed. KSh ${amount} received.` : 'Your booking is confirmed.',
    },
    pending: {
      icon: <FiLoader className="text-5xl text-amber-500" />,
      title: 'Payment still processing',
      body: 'This can take a moment. Check "My Bookings" shortly to see the updated status.',
    },
    failed: {
      icon: <FaTimesCircle className="text-5xl text-dred" />,
      title: 'Payment failed',
      body: 'Your booking was not paid. You can retry payment from "My Bookings".',
    },
    error: {
      icon: <FaTimesCircle className="text-5xl text-dred" />,
      title: 'Could not confirm payment',
      body: 'Something went wrong while verifying. Check "My Bookings" for the latest status.',
    },
  }[state]

  return (
    <section className={`min-h-screen flex items-center justify-center px-4 ${fontSyne.className}`}>
      <div className="w-full max-w-md text-center bg-faintWhite dark:bg-faintBlack border-2 border-dgreen dark:border-dred rounded-2xl p-8 sm:p-10">
        <div className="flex justify-center mb-5">{content.icon}</div>

        <h1 className={`text-2xl sm:text-3xl font-bold text-black dark:text-white mb-3 ${fontTourney.className}`}>
          {content.title}
        </h1>
        <p className="text-black dark:text-white opacity-70 mb-8">{content.body}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/bookings"
            className={`${fontTourney.className} tracking-wide px-6 py-2.5 rounded-md font-bold text-black dark:text-white bg-dgreen dark:bg-dred hover:opacity-80 transition-opacity`}
          >
            My Bookings
          </Link>
          <Link
            href="/bikes"
            className="px-6 py-2.5 rounded-md font-semibold text-black dark:text-white border-2 border-dgreen dark:border-dred hover:opacity-80 transition-opacity"
          >
            Browse Bikes
          </Link>
        </div>
      </div>
    </section>
  )
}

// useSearchParams needs a Suspense boundary in the app router.
const Page = () => (
  <Suspense fallback={<section className="min-h-screen flex items-center justify-center" />}>
    <PaymentStatus />
  </Suspense>
)

export default Page
