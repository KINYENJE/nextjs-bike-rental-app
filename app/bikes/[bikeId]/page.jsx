import React from 'react'
import { client } from '../../../sanity/lib/client'
import { Orbitron , Tourney, Syne  } from 'next/font/google';

import Image from 'next/image';
import { GoNoEntry } from 'react-icons/go';
import { BlackTriangle } from '../../components/icons'

const fontOrbitron = Orbitron({ weight: '600', subsets: ['latin'] })
const fontTourney = Tourney({ weight: '600', subsets: ['latin'] })
const fontSyne = Syne({ weight: '400', subsets: ['latin'] })


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
    <section className='container lg:min-h-[100vh] mx-11 flex justify-center items-center' >

     {bikeObj.map((bike) => (

      <div key={bike._id} className='flex flex-col lg:flex-row w-full lg:w-3/4 justify-center items-center gap-12'>
        <div className='w-1/2 px-2 '>
          <div className='  flex items-center justify-center w-fit  rounded-xl '>
            <Image src={bike.imageUrl} alt={"bike image"} width={396} height={300} className=' object-fill  rounded-lg w-[396px] h-[324px]' />
          </div>
          

        </div>


        <div className='w-1/2 flex flex-col items-center justify-center  px-14 '>
          <div className='absolute '>
          <BlackTriangle />
          </div>

          <div className='z-20 -mt-10'>
          <h1 className={`text-6xl font-bold  text-black dark:text-white z-20 ${fontTourney.className}`}>{bike.brand.name}</h1>
          <p className={`${fontSyne.className} tracking-widest text-xl py-2 capitalize z-20`}>{bike.owner} , <span>{bike.location.name}</span> </p>
          </div>

          <div className='flex items-center justify-center  text-wrap w-3/4 max-h-20 z-20 mt-6'>
          {bike.description == null ? <p className={`${fontSyne.className} text-5xl my-24 text-black dark:text-white `}>
          <GoNoEntry />
          </p> : <p className={`${fontSyne.className} text-lg text-black dark:text-white my-24`}>{bike.description}</p>}
          
          </div>

          {/** form fiels for booking time and price */}
          <div className='relative top-20'>
            <form action="" className='flex bg-sky-100 dark:bg-black opacity-80  rounded-full pt-6 px-10 py-2 gap-3 shadow-2xl '>
              <div className='w-3/4 flex flex-col'>
                <label htmlFor="" className='text-black dark:text-white'>Booking Time: </label>
                <input type="time" placeholder='Enter your booking time' className=' p-2 my-2 rounded-full' />
              </div>
              <div className='w-1/4'>
                <label htmlFor="" className='text-black dark:text-white'>Price: </label>
                <button  type='submit' className='bg-dgreen dark:bg-dred font-medium p-2 rounded-full my-2 capitalize text-black'>
                   {bike.price}/hr.
                </button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
     ))}

    </section>
  )
}

export default page