import React from 'react'
import { client } from '../../sanity/lib/client'
import { Bike } from '../../types'
import BikesBrowser from '../components/BikesBrowser'
import { Tourney } from 'next/font/google'

const fontTourney = Tourney({ weight: '600', subsets: ['latin'] })

async function getAllBikes() {
  const query = `*[_type == "bike"] | order(_createdAt desc) {
    _id,
    "imageUrl":image.asset->url,
    _createdAt,
    brand->{name, _id},
    price,
    phone,
    slug,
    owner,
    description,
    location->{name, _id},
    bikeType->{name, _id},
    _updatedAt,
}`

  const bikes = await client.fetch(query)
  return bikes
}

// Pull the cumulative rating per bike from the backend. Non-fatal: if the API
// is unreachable, bikes simply render with "No reviews yet".
async function getRatingSummary(): Promise<Record<string, { average: number; count: number }>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/summary`, {
      cache: 'no-store',
    })
    if (!res.ok) return {}
    const data = await res.json()
    return data.summary || {}
  } catch {
    return {}
  }
}

// Bikes that are booked right now, with the time they free up. Derived live
// from bookings, so it must never be cached.
async function getAvailability(): Promise<Record<string, { until: string }>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bikes/availability`, {
      cache: 'no-store',
    })
    if (!res.ok) return {}
    const data = await res.json()
    return data.unavailable || {}
  } catch {
    return {}
  }
}

export const revalidate = 60

const Page = async () => {
  const [bikes, ratingSummary, unavailable] = await Promise.all([
    getAllBikes(),
    getRatingSummary(),
    getAvailability(),
  ])

  const bikesWithMeta: Bike[] = bikes.map((bike: Bike) => ({
    ...bike,
    rating: ratingSummary[bike._id] || { average: 0, count: 0 },
    availability: unavailable[bike._id]
      ? { available: false, until: unavailable[bike._id].until }
      : { available: true },
  }))

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8 min-h-screen pt-28 pb-16">
      <h1 className={`text-4xl sm:text-5xl font-bold mb-8 text-black dark:text-white ${fontTourney.className}`}>
        Browse <span className="text-dgreen dark:text-dred">Bikes</span>
      </h1>

      <BikesBrowser bikes={bikesWithMeta} />
    </section>
  )
}

export default Page
