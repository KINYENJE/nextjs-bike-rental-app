import React from 'react'
import { client } from '../../../sanity/lib/client'
import { Orbitron , Tourney, Syne  } from 'next/font/google';

import Image from 'next/image';
import { GoNoEntry } from 'react-icons/go';
import { BlackTriangle } from '../../components/icons'
import BookingForm from '../../components/BookingForm';
import BikeReviews from '../../components/BikeReviews';

const fontOrbitron = Orbitron({ weight: '600', subsets: ['latin'] })
const fontTourney = Tourney({ weight: '600', subsets: ['latin'] })
const fontSyne = Syne({ weight: '400', subsets: ['latin'] })
const boldSyne = Syne({ weight: '700', subsets: ['latin'] })


const fetchBike = async (bikeId) => {
  const query = `*[_type == "bike" && _id == "${bikeId}"] {
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

  const bike = await client.fetch(query)
  return bike
}

// Bikes currently booked (derived live from bookings). Non-fatal on failure.
const fetchAvailability = async () => {
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


const page = async ({params}) => {
  const [bikeObj, unavailable] = await Promise.all([
    fetchBike(params.bikeId),
    fetchAvailability(),
  ])

  return (
    <section className='w-full overflow-x-hidden' >

     {bikeObj.map((bike) => (

      <div key={bike._id}>
       <div className='min-h-screen flex flex-col xl:flex-row w-full justify-center items-center gap-8 md:gap-12 px-4 pt-28 pb-12 xl:px-11'>
        <div className='xl:w-1/2 px-2 justify-center items-center flex w-full max-md:pt-20 '>
          <div className='  flex items-center justify-center w-fit  rounded-xl '>
            <Image src={bike.imageUrl} alt={"bike image"} width={396} height={300} className=' object-fill  rounded-lg w-[396px] h-[324px]' />
          </div>
          

        </div>


        <div className='w-full xl:w-1/2 flex flex-col items-center justify-center relative lg:px-14'>
          <div className='absolute'>
            <BlackTriangle />
          </div>

          <div className='z-20 '>
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold  text-black dark:text-white z-20 ${fontTourney.className}`}>{bike.brand.name}</h1>
            <p className={`${boldSyne.className} tracking-wide  text-xl py-2 capitalize z-20`}>{bike.owner} , <span>{bike.location.name}</span> </p>
          </div>

          <div className='flex items-center justify-center  text-wrap  w-3/4  z-20 xl:mt-6'>
          {bike.description == null ? <p className={`${fontSyne.className} text-5xl md:my-24 text-black dark:text-white `}>
          <GoNoEntry />
          </p> : <p className={`${fontSyne.className} md:text-lg text-sm text-black dark:text-white my-6 md:my-24`}>{bike.description}</p>}
          
          </div>

          {/** availability status */}
          <div className='z-20 mb-3'>
            {unavailable[bike._id] ? (
              <span className='flex items-center gap-2 text-sm font-semibold text-black dark:text-white bg-black/10 dark:bg-white/10 px-3 py-1.5 rounded-full'>
                <span className='w-2 h-2 rounded-full bg-amber-400' />
                Booked until {new Date(unavailable[bike._id].until).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
              </span>
            ) : (
              <span className='flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1.5 rounded-full'>
                <span className='w-2 h-2 rounded-full bg-emerald-500' />
                Available now
              </span>
            )}
          </div>

          {/** form fields for booking time and price */}
          <div className='  '>

            <BookingForm price={bike.price} bikeId={bike._id} bikeOwner={bike.owner} bikeType={bike.bikeType.name} bikeLocation={bike.location.name} />
          </div>

        </div>
       </div>

       {/* Reviews section */}
       <div className='px-4 sm:px-8 pb-20'>
         <BikeReviews bikeId={bike._id} />
       </div>
      </div>
     ))}

    </section>
  )
}

export default page