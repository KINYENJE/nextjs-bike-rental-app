import React from 'react'
import Image from 'next/image'
import { BikeCardProps } from '../../types'
import Link from 'next/link'
import { GoNoEntry } from "react-icons/go";
import { Orbitron , Tourney  } from 'next/font/google';

const fontOrbitron = Orbitron({weight: "700", subsets: ['latin']})

const fontTourney = Tourney({weight: "600", subsets: ['latin']})


// {
//   _id: '353d619f-122a-4948-a552-62c1f42449e8',
//   brand: [ [Object] ],
//   price: 99,
//   phone: '+254 701685317',
//   slug: { current: 'contez-bikez', _type: 'slug' },
//   owner: 'contez bikez',
//   location: [ [Object] ],
//   imageUrl: 'https://cdn.sanity.io/images/8i24trdf/production/634a343d02f0b7afe8a9eee1d88da64e31c42c08-4440x2960.jpg',
//   _createdAt: '2024-02-27T22:35:03Z',
//   bikeType: { name: 'racing', _id: 'f59af4b5-0fc1-4fdc-a6b6-f9fce2002ab9' },
//   _updatedAt: '2024-02-27T22:35:03Z'
// },



const BikeCard : React.FC<BikeCardProps> = ({ vertical, horizontal, ...bike }) => {

  return (
    <Link href={`/bikes/${bike._id}`} key={bike._id} className='dark:bg-black rounded-lg shadow-md   pb-4'>
      <div className=' pb-2 rounded-lg min-h-[200px]'>
      <Image src={bike.imageUrl} width={300} height={200} alt='bike' className='w-full rounded-lg object-cover min-h-[200px] aspect-auto' />
      </div>
      
      <div className='px-2 '>
        <div className='flex justify-between items-center capitalize text-wrap'>
          <p className={`${fontOrbitron.className} text-sm font-semibold`}>{bike.owner}</p>
          <p className={`text-[12px] font-bold`}> <span className=' font-light text-[10px]'>Location: </span> {bike.location.name}</p>
        </div>

        <div className='flex justify-between items-center mt-3 px-2 capitalize text-wrap'>
          {bike.brand.name !== "not available"  ? <p className={`font-bold text-xl ${fontTourney.className} `}>{bike.brand.name}</p> :  <p><GoNoEntry /></p> }
          <button className={`bg-dgreen dark:bg-dred px-2 py-1 rounded-lg text-[16px] ${fontOrbitron.className}`} >Ksh.{bike.price} /hr</button>
        </div>
        
        </div>
    </Link>
  )
}

export default BikeCard