import React from 'react'
import Image from 'next/image'
import { BikeCardProps } from '../../types'
import Link from 'next/link'
import { GoNoEntry } from "react-icons/go"
import { FiMapPin } from "react-icons/fi"
import { Orbitron, Tourney } from 'next/font/google'
import StarRating from './StarRating'

const fontOrbitron = Orbitron({ weight: "700", subsets: ['latin'] })
const fontTourney = Tourney({ weight: "600", subsets: ['latin'] })

const BikeCard: React.FC<BikeCardProps> = ({ vertical, horizontal, ...bike }) => {
  const hasBrand = bike.brand?.name && bike.brand.name !== "not available"
  const isAvailable = bike.availability?.available !== false

  return (
    <Link
      href={`/bikes/${bike._id}`}
      className="group flex flex-col bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-dgreen dark:hover:border-dred transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={bike.imageUrl}
          alt={`${bike.owner} bike`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Price badge */}
        <span className={`absolute top-3 right-3 bg-dgreen dark:bg-dred text-black dark:text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-md ${fontOrbitron.className}`}>
          Ksh {bike.price}
          <span className="font-light text-[11px]">/hr</span>
        </span>

        {/* Bike type chip */}
        {bike.bikeType?.name && (
          <span className="absolute bottom-3 left-3 bg-black/55 text-white text-[11px] font-medium px-2.5 py-1 rounded-full capitalize backdrop-blur-sm">
            {bike.bikeType.name}
          </span>
        )}

        {/* Availability badge */}
        <span
          className={`absolute top-3 left-3 flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${
            isAvailable ? 'bg-emerald-500/85 text-white' : 'bg-black/60 text-white'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-white' : 'bg-amber-400'}`} />
          {isAvailable ? 'Available' : 'Booked'}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-4">
        {/* Brand (primary) */}
        <div className="flex items-center justify-between gap-2 min-h-[28px]">
          {hasBrand ? (
            <h3 className={`font-bold text-xl capitalize text-black dark:text-white truncate ${fontTourney.className}`}>
              {bike.brand.name}
            </h3>
          ) : (
            <span className="text-black/40 dark:text-white/40 text-2xl"><GoNoEntry /></span>
          )}
        </div>

        {/* Rating */}
        <StarRating value={bike.rating?.average ?? 0} count={bike.rating?.count ?? 0} showCount size="text-sm" />

        {/* Meta row: location + owner */}
        <div className="flex items-center justify-between gap-2 pt-2 mt-1 border-t border-black/5 dark:border-white/10 text-xs">
          <span className="flex items-center gap-1 text-black dark:text-white opacity-70 capitalize truncate">
            <FiMapPin className="text-dgreen dark:text-dred shrink-0" /> {bike.location?.name}
          </span>
          <span className={`text-black dark:text-white opacity-60 capitalize truncate ${fontOrbitron.className}`}>
            {bike.owner}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default BikeCard
