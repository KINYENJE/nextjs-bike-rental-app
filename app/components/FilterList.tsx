"use client"

import React , { useState } from 'react'
import { BikesConstantData, LocationsConstantData, BrandsConstantData,BikeTypesConstantData } from '../constants';
// import { client } from '../../sanity/lib/client';
import { Bike } from '../../types';
// import { BikeType, Brand} from '../../types';





  // async function getAllLocations() {
  //   const query = `*[_type == "location"] {
  //     _id,
  //     name,
  //     slug,
  // }`
  
  //   const locations = await client.fetch(query)
  //   return locations
  // }
  
  // async function getAllBikeTypes() {
  //   const query = `*[_type == "bikeType"] {
  //     _id,
  //     name,
  //     slug,
  // }`
  
  //   const bikeTypes = await client.fetch(query)
  //   return bikeTypes
  // }
  
  // async function getAllBrands() {
  //   const query = `*[_type == "brand"] {
  //     _id,
  //     name,
  //     slug,
  // }`
  
  //   const brands = await client.fetch(query)
  //   return brands
  // }





const FilterList = () => {
  // const locations = await getAllLocations()
  const locations =  LocationsConstantData
  // console.log(locations, 'locations')
  // const bikeTypes = await getAllBikeTypes()
  const bikeTypes =  BikeTypesConstantData
  console.log(bikeTypes, 'bikeTypes')
  // const brands = await getAllBrands()
  const brands =  BrandsConstantData
  console.log(brands, 'brands')


  const [bikes, setBikes] = useState([...BikesConstantData])
  console.log(bikes, 'bikes222')
  const [selectedLocation, setSelectedLocation] = useState<string>('All')
  const [selectedBrand, setSelectedBrand] = useState<string>('All')
  const [selectedType, setSelectedType] = useState<string>('All')


  const FetchByLocation = (e:any ) => {
    setSelectedLocation(e.target.value)


    {/** to filter the array location attribute in bikes array */}
    if(e.target.value === 'all'){
      setBikes([...BikesConstantData])
    }else{
      const filteredBikes = BikesConstantData.filter((bike: Bike) => bike.location[0].slug.current === e.target.value.toLowerCase())
      setBikes(filteredBikes)
    }

    return 

  }


  interface MyLocation {
    _id: string;
    name: string;
    slug: {
      current: string;
      _type: string;
    };
  }
  
  // Then use this type in your map function:
  
  


  return (
    <div className='flex flex-col items-center space-x-4 bg-red-700'>
          <p>Filter by:</p>
          <select title='location' name="location" id="location" className='border-2 border-gray-200 rounded-lg' onChange={FetchByLocation}>
            <option value="all">All</option>
            {locations.map((location: MyLocation) => (
              <option key={location._id} value={location.slug.current}>
                {location.name}
              </option>
            ))}
          </select>
          <select name="brand" id="brand" className='border-2 border-gray-200 rounded-lg'>
            <option value="all">All</option>
            <option value="giant">Giant</option>
            <option value="trek">Trek</option>
            <option value="specialized">Specialized</option>
            <option value="cannondale">Cannondale</option>
          </select>
          <select name="type" id="type" className='border-2 border-gray-200 rounded-lg'>
            <option value="all">All</option>
            <option value="racing">Racing</option>
            <option value="mountain">Mountain</option>
            <option value="hybrid">Hybrid</option>
            <option value="city">City</option>
          </select>
        </div>
  )
}

export default FilterList