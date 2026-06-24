import React from 'react'
import BookingCard from '../components/BookingCard'
import { Tourney } from 'next/font/google'

const fontTourney = Tourney({ weight: "600", subsets: ['latin'] })

const Page = () => {
  return (
    <section className="mx-auto max-w-4xl px-4 min-h-screen flex items-center justify-center flex-col pt-28 pb-16">
      <h1 className={`font-bold text-3xl sm:text-4xl mb-2 text-black dark:text-white ${fontTourney.className}`}>
        Ride <span className="text-dgreen dark:text-dred">History</span>
      </h1>
      <p className="text-black dark:text-white opacity-60 mb-10 text-center">Your completed and past rides</p>

      <BookingCard variant="history" />
    </section>
  )
}

export default Page
