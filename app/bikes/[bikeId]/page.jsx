import React from 'react'
import { client } from '../../../sanity/lib/client'
import { Orbitron , Tourney, Syne  } from 'next/font/google';

import Image from 'next/image';
import { GoNoEntry } from 'react-icons/go';
import { BlackTriangle } from '../../components/icons'
import BookingForm from '../../components/BookingForm';

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


const page = async ({params}) => {
  const bikeObj = await fetchBike(params.bikeId)
  console.log(bikeObj)

  return (
    <section className='w-full h-[100vh] xl:mx-11 flex justify-center items-center' >

     {bikeObj.map((bike) => (

      <div key={bike._id} className='flex flex-col xl:flex-row w-full justify-center items-center gap-8 md:gap-12 max-md:mt-20'>
        <div className='xl:w-1/2 px-2 justify-center items-center flex w-full max-md:pt-20 '>
          <div className='  flex items-center justify-center w-fit  rounded-xl '>
            <Image src={bike.imageUrl} alt={"bike image"} width={396} height={300} className=' object-fill  rounded-lg w-[396px] h-[324px]' />
          </div>
          

        </div>


        <div className='w-full xl:w-1/2 flex flex-col items-center justify-center  lg:px-14'>
          <div className='absolute '>
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

          {/** form fields for booking time and price */}
          <div className='relative z-20 top-20 '>
            
            <BookingForm price={bike.price} bikeId={bike._id} bikeOwner={bike.owner} bikeType={bike.bikeType.name} bikeLocation={bike.location.name} />
          </div>
          
        </div>
      </div>
     ))}

    </section>
  )
}

export default page