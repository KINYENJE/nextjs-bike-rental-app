"use client"
import React, {useState, useEffect} from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const BookingForm = ({price, bikeId, bikeType, bikeOwner, bikeLocation }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [finalPrice, setFinalPrice] = useState(0)

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const { data: session } = useSession();
  const router = useRouter();
  // console.log("Session data:", session);
  const email = session?.user?.email;

  // Mirrors the backend billing: 15-minute increments rounded down, 1-hour
  // minimum, integer price.
  const calculatePrice = (start, end) => {
    const totalMinutes = Math.abs((end - start) / 1000 / 60);
    const blocks = Math.floor(totalMinutes / 15 + 1e-9);
    const billableMinutes = Math.max(60, blocks * 15);
    return Math.round((billableMinutes / 60) * price);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();
      setFinalPrice(calculatePrice(startTime, endTime));
    } else {
      setFinalPrice(0);
    }
  }, [startDate, endDate, price]);

  const checkIdPic = async () => {
    
    console.log("User email:", email);

    if (!email) {
      toast.error('Please sign in to book a bike')
      return false
    }
      const response = await fetch(`${API_URL}/api/check-user?email=${encodeURIComponent(email)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json()
    console.log("Check ID Pic response:", data);
    
    if (data.exists === true && data.user.idPic) {
      return true
    } else if (data.exists === true && !data.user.idPic) {
      console.error("ID picture not found for user:", email);
      toast.error('Please upload your ID picture before booking a bike.')
      router.push('/signup')
      return false
    } else if (data.exists === false) {
      console.error("User not found:", email);
      toast.error('User not found. Please sign up first.')
      router.push('/signup')
      return false
    }
  }


  const handleBooking = async (e) => {
    e.preventDefault()

    // check if user is sign in and if not, show toast message
    if (!session || !session.user || !session.user.email) {
      toast.error('Please sign in to book a bike')
      return
    }

    // for signed in users check if idpic is available in database
    const hasIdPic = await checkIdPic()
    if (!hasIdPic) {
      return // return
    }
    
    const startTime = new Date(startDate).getTime()
    const endTime = new Date(endDate).getTime()

    const booking = {
      startTime,
      endTime,
      price: calculatePrice(startTime, endTime),
      bikeId,
      bikeType,
      bikeOwner,
      bikeLocation

    }
    console.log(booking)

    const response = await fetch(`${API_URL}/api/booking?email=${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking)
    })

    const result = await response.json()

    if (result.status !== 'ok') {
      toast.error(result.message || 'Booking failed')
      return
    }

    toast.success('Booking reserved — redirecting to payment…')

    // Hand off to the payment provider. The booking stays unpaid until the
    // payment is confirmed, and can be paid later from "My Bookings".
    try {
      const payRes = await fetch(`${API_URL}/api/payments/checkout?email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId: result.booking._id }),
      })
      const payResult = await payRes.json()

      if (payResult.status === 'ok' && payResult.checkoutUrl) {
        window.location.href = payResult.checkoutUrl
      } else {
        toast.error(payResult.message || 'Could not start payment. You can pay from My Bookings.')
        router.push('/bookings')
      }
    } catch (err) {
      toast.error('Could not start payment. You can pay from My Bookings.')
      router.push('/bookings')
    }
  }
  
  
  return (
    <form action="POST" onSubmit={handleBooking} className='flex flex-col md:flex-row bg-sky-100 dark:bg-black opacity-80 rounded-xl  md:rounded-full pt-6 px-4  md:px-10 py-2 gap-3 shadow-2xl justify-center items-center'>
      <div className='md:w-3/4 flex flex-col '>
        <label htmlFor="" className='text-black dark:text-white'>Starting Time: </label>
        <input type="datetime-local" placeholder='Enter your booking time'   required value={startDate} onChange={(e) => setStartDate(e.target.value)}
         className=' p-2 my-2 rounded-full' step="900" />
      </div>
      <div className='md:w-3/4 flex flex-col '>
        <label htmlFor="" className='text-black dark:text-white'>Ending Time: </label>
        <input type="datetime-local" placeholder='Enter your booking time' step={"900"}
        value={endDate} onChange={(e) => setEndDate(e.target.value)}
         className=' p-2 my-2 rounded-full' />
      </div>

      <div className='md:w-1/4 w-full flex flex-col '>
        <label htmlFor="" className='text-black dark:text-white'>Price: </label>
        <button  type='submit' className='bg-dgreen dark:bg-dred font-medium p-2 rounded-full my-2 capitalize text-black w-full'>
            {finalPrice > 0 ? `${finalPrice}/-` : `${price}/hr.`}
        </button>
      </div>
    </form>
  )
}

export default BookingForm