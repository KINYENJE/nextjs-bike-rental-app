"use client"
import React, {useState} from 'react'
import toast from 'react-hot-toast'

const BookingForm = ({price, bikeId, bikeType, bikeOwner, bikeLocation }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleBooking = async (e) => {
    e.preventDefault()
    
    const startTime = new Date(startDate).getTime()
    const endTime = new Date(endDate).getTime()

    const timeDiff = (endTime - startTime) / 1000 / 60 / 60
    console.log(timeDiff)
    // absolute value of final price
    const finalPrice = Math.abs(timeDiff * price)

    const booking = {
      startTime,
      endTime,
      finalPrice,
      bikeId,
      bikeType,
      bikeOwner,
      bikeLocation

    }
    console.log(booking)

    const response = await fetch('http://localhost:5000/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify(booking)
    })

    const result = await response.json()
    console.log(result)
    if (result.status === 'ok') {
      toast.success('Booking successful')
    } else {
      toast.error('Booking failed')
    }
  }
  
  
  return (
    <form action="POST" onSubmit={handleBooking} className='flex bg-sky-100 dark:bg-black opacity-80  rounded-full pt-6 px-10 py-2 gap-3 shadow-2xl '>
      <div className='w-3/4 flex flex-col'>
        <label htmlFor="" className='text-black dark:text-white'>Starting Time: </label>
        <input type="datetime-local" placeholder='Enter your booking time'   required value={startDate} onChange={(e) => setStartDate(e.target.value)}
         className=' p-2 my-2 rounded-full' step="3600" />
      </div>
      <div className='w-3/4 flex flex-col'>
        <label htmlFor="" className='text-black dark:text-white'>Ending Time: </label>
        <input type="datetime-local" placeholder='Enter your booking time' step={"3600"}
        value={endDate} onChange={(e) => setEndDate(e.target.value)}
         className=' p-2 my-2 rounded-full' />
      </div>

      <div className='w-1/4'>
        <label htmlFor="" className='text-black dark:text-white'>Price: </label>
        <button  type='submit' className='bg-dgreen dark:bg-dred font-medium p-2 rounded-full my-2 capitalize text-black'>
            {price}/hr.
        </button>
      </div>
    </form>
  )
}

export default BookingForm