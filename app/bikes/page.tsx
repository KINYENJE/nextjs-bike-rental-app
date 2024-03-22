

import React, { useState } from 'react'
import { client } from '../../sanity/lib/client'
import { Bike , Location} from '../../types';
import Image from 'next/image';
import { urlForImage } from '../../sanity/lib/image';
import BikeCard from '../components/BikeCard';
import FilterList from '../components/FilterList';

import { BikesConstantData } from '../constants';




async function getAllBikes() {
  const query = `*[_type == "bike"] {
    _id,
    "imageUrl":image.asset->url,
    _createdAt,
    brand->{name, _id},
    price,
    phone,
    slug,
    owner,
    location->{name, _id},
    bikeType->{name, _id},
    _updatedAt,

}`

  const bikes = await client.fetch(query)
  return bikes
}




export const revalidate = 60;


// eslint-disable-next-line @next/next/no-async-client-component
const Page = async () => {
  const bikes : Bike[] = await getAllBikes()
  // const bikes : Bike[] =  BikesConstantData 
  console.log(bikes , 'bikes')
  



  
  return (
    <section className='mx-11 min-h-[100vh] ' >
      <div className=' mx-auto px-14 pt-24'>
        <h1 className='text-4xl font-bold'>Bikes</h1>
      </div>

      <div className='   flex justify-between items-center '>

        {/** filter section */}
       <FilterList />

       
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-10 w-2/3'>
          {bikes.map((bike) => (
           <>
            <BikeCard key={bike._id} {...bike} />
            <BikeCard key={bike._id} {...bike} />
            <BikeCard key={bike._id} {...bike} />
            </>

          ))}
        </div>
      </div>

    </section>
  )
}

export default Page 