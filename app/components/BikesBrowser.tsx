"use client"

import React, { useMemo, useState } from 'react'
import { Bike } from '../../types'
import BikeCard from './BikeCard'
import FilterList from './FilterList'

const initialFilters = {
  search: '',
  location: 'all',
  bikeType: 'all',
  brand: 'all',
  sort: 'newest',
}

const uniqueNames = (bikes: Bike[], pick: (b: Bike) => string | undefined) =>
  [...new Set(bikes.map(pick).filter(Boolean) as string[])].sort((a, b) =>
    a.localeCompare(b)
  )

const BikesBrowser = ({ bikes }: { bikes: Bike[] }) => {
  const [filters, setFilters] = useState(initialFilters)

  const locations = useMemo(() => uniqueNames(bikes, (b) => b.location?.name), [bikes])
  const bikeTypes = useMemo(() => uniqueNames(bikes, (b) => b.bikeType?.name), [bikes])
  const brands = useMemo(() => uniqueNames(bikes, (b) => b.brand?.name), [bikes])

  const handleChange = (key: string, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }))

  const handleClear = () => setFilters(initialFilters)

  const filteredBikes = useMemo(() => {
    const search = filters.search.trim().toLowerCase()

    return bikes
      .filter((bike) => {
        const matchesSearch =
          search === '' ||
          [bike.owner, bike.brand?.name, bike.location?.name, bike.bikeType?.name]
            .some((field) => field?.toLowerCase().includes(search))

        const matchesLocation = filters.location === 'all' || bike.location?.name === filters.location
        const matchesType = filters.bikeType === 'all' || bike.bikeType?.name === filters.bikeType
        const matchesBrand = filters.brand === 'all' || bike.brand?.name === filters.brand

        return matchesSearch && matchesLocation && matchesType && matchesBrand
      })
      .sort((a, b) => {
        if (filters.sort === 'price-asc') return a.price - b.price
        if (filters.sort === 'price-desc') return b.price - a.price
        return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
      })
  }, [bikes, filters])

  return (
    <div className="flex flex-col gap-8">
      <FilterList
        locations={locations}
        bikeTypes={bikeTypes}
        brands={brands}
        filters={filters}
        onChange={handleChange}
        onClear={handleClear}
        resultCount={filteredBikes.length}
        totalCount={bikes.length}
      />

      {filteredBikes.length === 0 ? (
        <div className="text-center py-20 text-black dark:text-white">
          <p className="opacity-70 mb-4">No bikes match your filters.</p>
          <button
            type="button"
            onClick={handleClear}
            className="text-dgreen dark:text-dred font-semibold hover:underline underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-10">
          {filteredBikes.map((bike) => (
            <BikeCard key={bike._id} {...bike} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BikesBrowser
