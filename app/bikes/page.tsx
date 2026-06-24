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

export const revalidate = 60

const Page = async () => {
  const bikes: Bike[] = await getAllBikes()

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-8 min-h-screen pt-28 pb-16">
      <h1 className={`text-4xl sm:text-5xl font-bold mb-8 text-black dark:text-white ${fontTourney.className}`}>
        Browse <span className="text-dgreen dark:text-dred">Bikes</span>
      </h1>

      <BikesBrowser bikes={bikes} />
    </section>
  )
}

export default Page
