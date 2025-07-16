"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BsTrash3 } from "react-icons/bs";
import { Orbitron } from 'next/font/google'


const fontOrbitron = Orbitron({weight: "700", subsets: ['latin']})



const BookingCard = () => {

  const [bookings, setBookings] = useState([])
 
  const [status, setStatus] = useState('pending')

  const API_URL = process.env.NEXT_PUBLIC_API_URL;



  const findBookings = async () => {
    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application ',
        'authorization': localStorage.getItem('token')
      }
    })

    const result = await response.json()
    console.log(result)
    if (result.status === 'ok') {
      setBookings(result.bookings)
      toast.success('Bookings fetched successfully')
    } else {
      toast.error('Error fetching bookings')
    }
  }

useEffect(() => {
  findBookings()
}, [])



// setStartingTime(bookings.startTime)
// setEndingTime(bookings.endTime)
// setFinalPrice(bookings.finalPrice)
// setStatus(bookings.status)

const changeStatus = () => {
  if (Date.now() > new Date(bookings.endingTime).getTime()) {
    setStatus('completed')
  } else if (Date.now() < new Date(bookings.startingTime).getTime()) {
    setStatus('pending')
  } else {
    setStatus('ongoing')
  
  }
}

const handleStatusChange = async (id) => {

  changeStatus()
  
  const booking = {

    status
  }
  console.log(booking)
  const response = await fetch(`${API_URL}/api/booking/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "authorization": localStorage.getItem('token'),
    },
    body: JSON.stringify(booking)
  })

  const result = await response.json()
  console.log(result)
  if (result.status === 'ok') {
    toast.success('Status changed successfully')
  } else {
    toast.error('Error changing status')
  }
}

const handleDelete = async (id) => {
  const response = await fetch(`${API_URL}/api/booking/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      "authorization": localStorage.getItem('token'),
    },
  })

  const result = await response.json()
  console.log(result)
  if (result.status === 'ok') {
    toast.success('Booking deleted successfully')
  } else {
    toast.error('Error deleting booking')
  }
}





  return (
    <>
    
      {bookings.map((booking, index) => {
        
        return (
          <div key={index} className={`  w-full py-6 bg-faintWhite dark:bg-faintBlack flex items-center justify-between my-2 px-6 rounded-lg border-2 dark:border-dred border-dgreen border-spacing-3 `}>
          <div className='flex flex-col items-start justify-center gap-2'>
            <p className='text-black dark:text-white text-sm capitalize opacity-60'>{booking.bikeType} Bike</p>
            <p className='text-black dark:text-white capitalize font-semibold text-sm'>{booking.bikeOwner}</p>
            <p className='text-black dark:text-white opacity-60'>{booking.bikeLocation}</p>
          </div>
          <div className='flex flex-col items-center justify-center gap-1 text-stone-600 text-sm capitalize font-bold'>
            <p className='text-black dark:text-white'>{new Date(booking.startTime).toLocaleDateString( 
              'en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              } 
             )}</p>
            <p>to</p>
            <p className='text-black dark:text-white'>{new Date(booking.endTime).toLocaleDateString( 
              'en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              } 
             )}</p>
            <p className='text-black dark:text-white'>{booking.finalPrice}</p>
          </div>
          <div className='flex flex-col items-end justify-center gap-5'>
            <p className={`text-dgreen ${fontOrbitron.className} dark:text-white capitalize text-sm font-bold`}>
              <span className='text-xs pr-2 text-stone-600 font-extrabold'>Status:</span>
              {booking.status}</p>
            <button onClick={() => handleStatusChange(booking._id)} className='bg-dgreen dark:bg-dred text-black dark:text-white rounded-lg px-2 py-1'>Change Status</button>
            <button onClick={() => handleDelete(booking._id)} className='bg-dgreen dark:bg-dred text-black dark:text-white rounded-lg px-2 py-2'><BsTrash3 /></button>
          </div>


          
        </div>
        )
        
      })}
    </>

  )
}

export default BookingCard