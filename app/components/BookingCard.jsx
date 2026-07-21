"use client"
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import Link from 'next/link'
import Image from 'next/image'
import { BsTrash3 } from "react-icons/bs"
import { Orbitron } from 'next/font/google'
import { useSession } from 'next-auth/react'
import { client } from '../../sanity/lib/client'

const fontOrbitron = Orbitron({ weight: "700", subsets: ['latin'] })

const FALLBACK_BIKE_IMAGE = '/bikesm.png'

// Derive a live status from the booking times so the label is always accurate,
// regardless of what is stored in the database.
const getDerivedStatus = (booking) => {
  const now = Date.now()
  const start = new Date(booking.startTime).getTime()
  const end = new Date(booking.endTime).getTime()
  if (booking.status === 'completed' || now > end) return 'completed'
  if (now < start) return 'upcoming'
  return 'ongoing'
}

const statusStyles = {
  upcoming: 'text-dgreen dark:text-dred',
  ongoing: 'text-amber-500',
  completed: 'text-stone-500 dark:text-stone-400',
}

const formatDate = (date) =>
  new Date(date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

const formatPrice = (price) => `KSh ${Math.round(Number(price) || 0).toLocaleString()}`

const BookingCard = ({ variant = 'active' }) => {
  const [bookings, setBookings] = useState([])
  const [bikeImages, setBikeImages] = useState({})
  const [loading, setLoading] = useState(true)
  const [payingId, setPayingId] = useState(null)

  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { data: session, status: sessionStatus } = useSession()

  // Bookings only store the bikeId, so fetch each bike's image from Sanity
  // and build a { bikeId: imageUrl } map for the card avatars.
  const fetchBikeImages = async (bookingList) => {
    const ids = [...new Set(bookingList.map((b) => b.bikeId).filter(Boolean))]
    if (ids.length === 0) return
    try {
      const results = await client.fetch(
        `*[_type == "bike" && _id in $ids]{ _id, "imageUrl": image.asset->url }`,
        { ids }
      )
      const map = {}
      results.forEach((bike) => {
        if (bike.imageUrl) map[bike._id] = bike.imageUrl
      })
      setBikeImages(map)
    } catch (err) {
      // Non-fatal — cards fall back to the placeholder image.
    }
  }

  const findBookings = async () => {
    if (!session?.user?.email) return
    try {
      const response = await fetch(`${API_URL}/api/bookings?email=${session.user.email}`)
      const result = await response.json()
      if (result.status === 'ok') {
        setBookings(result.bookings)
        fetchBikeImages(result.bookings)
      } else {
        toast.error('Error fetching bookings')
      }
    } catch (err) {
      toast.error('Error fetching bookings')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      findBookings()
    } else if (sessionStatus === 'unauthenticated') {
      setLoading(false)
    }
  }, [sessionStatus])

  const handlePay = async (bookingId) => {
    if (!session?.user?.email) return
    setPayingId(bookingId)
    try {
      const res = await fetch(`${API_URL}/api/payments/checkout?email=${encodeURIComponent(session.user.email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId }),
      })
      const result = await res.json()
      if (result.status === 'ok' && result.checkoutUrl) {
        window.location.href = result.checkoutUrl
      } else {
        toast.error(result.message || 'Could not start payment')
        setPayingId(null)
      }
    } catch (err) {
      toast.error('Could not start payment')
      setPayingId(null)
    }
  }

  const handleCancel = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking? This cannot be undone.')) {
      return
    }
    try {
      const response = await fetch(`${API_URL}/api/booking/${id}`, { method: 'DELETE' })
      const result = await response.json()
      if (result.status === 'ok') {
        setBookings((prev) => prev.filter((b) => b._id !== id))
        toast.success('Booking cancelled')
      } else {
        toast.error(result.message || 'Error cancelling booking')
      }
    } catch (err) {
      toast.error('Error cancelling booking')
    }
  }

  const visibleBookings = bookings.filter((b) => {
    const derived = getDerivedStatus(b)
    return variant === 'history' ? derived === 'completed' : derived !== 'completed'
  })

  if (sessionStatus === 'unauthenticated') {
    return (
      <div className="text-center text-black dark:text-white">
        <p className="opacity-70 mb-4">Please sign in to view your bookings.</p>
        <Link href="/login" className="text-dgreen dark:text-dred font-semibold hover:underline underline-offset-4">
          Go to Sign In
        </Link>
      </div>
    )
  }

  if (loading) {
    return <p className="text-black dark:text-white opacity-60 animate-pulse">Loading bookings…</p>
  }

  if (visibleBookings.length === 0) {
    return (
      <div className="text-center text-black dark:text-white">
        <p className="opacity-70 mb-4">
          {variant === 'history'
            ? 'You have no past rides yet.'
            : 'You have no upcoming bookings.'}
        </p>
        <Link href="/bikes" className="text-dgreen dark:text-dred font-semibold hover:underline underline-offset-4">
          Browse bikes
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl flex flex-col gap-4">
      {visibleBookings.map((booking) => {
        const derived = getDerivedStatus(booking)
        return (
          <div
            key={booking._id}
            className="w-full py-5 px-5 sm:px-6 bg-faintWhite dark:bg-faintBlack flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border-2 border-dgreen dark:border-dred"
          >
            {/* Bike avatar + info */}
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-full overflow-hidden border-2 border-dgreen dark:border-dred bg-white dark:bg-black">
                <Image
                  src={bikeImages[booking.bikeId] || FALLBACK_BIKE_IMAGE}
                  alt={`${booking.bikeType} bike`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col items-start justify-center gap-1">
                <p className="text-black dark:text-white text-xs capitalize opacity-60">{booking.bikeType} Bike</p>
                <p className="text-black dark:text-white capitalize font-semibold">{booking.bikeOwner}</p>
                <p className="text-black dark:text-white text-sm opacity-60 capitalize">{booking.bikeLocation}</p>
              </div>
            </div>

            {/* Time + price */}
            <div className="flex flex-col items-start sm:items-center justify-center gap-1 text-sm">
              <p className="text-black dark:text-white">{formatDate(booking.startTime)}</p>
              <p className="opacity-50 text-xs">to</p>
              <p className="text-black dark:text-white">{formatDate(booking.endTime)}</p>
              <p className={`${fontOrbitron.className} text-dgreen dark:text-dred font-bold mt-1`}>
                {formatPrice(booking.price)}
              </p>
            </div>

            {/* Status + actions */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 w-full sm:w-auto">
              <p className={`${fontOrbitron.className} ${statusStyles[derived]} capitalize text-sm font-bold`}>
                <span className="text-xs pr-2 text-stone-500 dark:text-stone-400 font-extrabold">Status:</span>
                {derived}
              </p>

              {/* Payment status */}
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                  booking.paymentStatus === 'paid'
                    ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                    : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
                }`}
              >
                {booking.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
              </span>

              {variant === 'active' && booking.paymentStatus !== 'paid' && (
                <button
                  onClick={() => handlePay(booking._id)}
                  disabled={payingId === booking._id}
                  title="Pay for this booking"
                  className={`flex items-center gap-2 bg-emerald-600 text-white rounded-lg px-3 py-2 text-sm font-semibold transition-opacity ${
                    payingId === booking._id ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
                  }`}
                >
                  {payingId === booking._id ? 'Redirecting…' : `Pay ${formatPrice(booking.price)}`}
                </button>
              )}

              {variant === 'active' && (
                <button
                  onClick={() => handleCancel(booking._id)}
                  title="Cancel booking"
                  className="flex items-center gap-2 bg-dgreen dark:bg-dred text-black dark:text-white rounded-lg px-3 py-2 text-sm font-semibold hover:opacity-80 transition-opacity"
                >
                  <BsTrash3 /> Cancel
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BookingCard
