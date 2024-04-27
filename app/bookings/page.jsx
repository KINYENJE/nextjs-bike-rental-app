import React from 'react'
import  BookingCard  from '../components/BookingCard'

import { Tourney  } from 'next/font/google';



const fontTourney = Tourney({weight: "600", subsets: ['latin']})

const Page = () => {

  return (
    <section className='mx-11 min-h-[100vh] flex items-center justify-center flex-col ' >
      <h1 className={`font-bold text-3xl mb-10 underline-offset-2 underline ${fontTourney.className}`}>My BOOKINGS</h1>
      
      <BookingCard />
    </section>
  )
}

export default Page