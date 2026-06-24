"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Tourney, Syne } from 'next/font/google'
import StarRating from './StarRating'

const fontTourney = Tourney({ weight: "600", subsets: ['latin'] })
const fontSyne = Syne({ weight: "400", subsets: ['latin'] })

const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })

const BikeReviews = ({ bikeId }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL
  const { data: session } = useSession()

  const [reviews, setReviews] = useState([])
  const [average, setAverage] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/reviews?bikeId=${bikeId}`)
      const data = await res.json()
      if (data.status === 'ok') {
        setReviews(data.reviews)
        setAverage(data.average)
        setCount(data.count)
      }
    } catch (err) {
      // leave the section empty on failure
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [bikeId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!session?.user?.email) {
      toast.error('Please sign in to leave a review')
      return
    }
    if (rating < 1) {
      toast.error('Please select a star rating')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${API_URL}/api/reviews?email=${encodeURIComponent(session.user.email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bikeId, rating, comment }),
      })
      const result = await res.json()
      if (result.status === 'ok') {
        toast.success('Thanks for your review!')
        setRating(0)
        setComment('')
        fetchReviews()
      } else {
        toast.error(result.message || 'Error submitting review')
      }
    } catch (err) {
      toast.error('Error submitting review')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`w-full max-w-3xl mx-auto ${fontSyne.className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl sm:text-3xl font-bold text-black dark:text-white ${fontTourney.className}`}>
          Reviews
        </h2>
        <div className="flex items-center gap-3">
          <StarRating value={average} size="text-lg" />
          <span className="text-black dark:text-white font-semibold">
            {count > 0 ? `${average.toFixed(1)} · ${count} review${count === 1 ? '' : 's'}` : 'No reviews yet'}
          </span>
        </div>
      </div>

      {/* Submit form */}
      <form
        onSubmit={handleSubmit}
        className="bg-faintWhite dark:bg-faintBlack border-2 border-dgreen dark:border-dred rounded-2xl p-5 sm:p-6 mb-8"
      >
        <p className="text-black dark:text-white font-semibold mb-3">Leave a review</p>
        <div className="mb-4">
          <StarRating value={rating} editable onChange={setRating} size="text-2xl" />
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this bike…"
          rows={3}
          className="w-full bg-white dark:bg-black text-black dark:text-white border-2 border-dsectext rounded-lg px-3 py-2 outline-none focus:border-dgreen dark:focus:border-dred placeholder:opacity-50 resize-none"
        />
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={submitting}
            className={`${fontTourney.className} tracking-wide px-6 py-2 rounded-md font-bold text-black dark:text-white bg-dgreen dark:bg-dred transition-opacity ${
              submitting ? 'opacity-40 cursor-not-allowed' : 'hover:opacity-80'
            }`}
          >
            {submitting ? 'Submitting…' : 'Submit Review'}
          </button>
        </div>
      </form>

      {/* Reviews list */}
      {loading ? (
        <p className="text-black dark:text-white opacity-60 animate-pulse">Loading reviews…</p>
      ) : reviews.length === 0 ? (
        <p className="text-black dark:text-white opacity-60 text-center py-6">
          Be the first to review this bike.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-faintWhite dark:bg-faintBlack border border-dgreen/40 dark:border-dred/40 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-black dark:text-white font-semibold capitalize">{review.userName}</p>
                <span className="text-xs text-black dark:text-white opacity-50">{formatDate(review.createdAt)}</span>
              </div>
              <StarRating value={review.rating} size="text-sm" />
              {review.comment && (
                <p className="text-black dark:text-white opacity-80 text-sm mt-2">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BikeReviews
