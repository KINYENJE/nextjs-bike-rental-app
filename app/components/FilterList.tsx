"use client"

import React from 'react'
import { FiSearch, FiX } from 'react-icons/fi'

interface Filters {
  search: string
  location: string
  bikeType: string
  brand: string
  sort: string
}

interface FilterListProps {
  locations: string[]
  bikeTypes: string[]
  brands: string[]
  filters: Filters
  onChange: (key: string, value: string) => void
  onClear: () => void
  resultCount: number
  totalCount: number
}

const selectClass =
  'capitalize bg-white dark:bg-black text-black dark:text-white border-2 border-dgreen dark:border-dred rounded-lg px-3 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-dgreen dark:focus:ring-dred min-w-[9rem]'

const FilterList = ({
  locations,
  bikeTypes,
  brands,
  filters,
  onChange,
  onClear,
  resultCount,
  totalCount,
}: FilterListProps) => {
  const isFiltering =
    filters.search !== '' ||
    filters.location !== 'all' ||
    filters.bikeType !== 'all' ||
    filters.brand !== 'all' ||
    filters.sort !== 'newest'

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dgreen dark:text-dred" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange('search', e.target.value)}
            placeholder="Search by owner, brand, location or type…"
            className="w-full bg-white dark:bg-black text-black dark:text-white border-2 border-dgreen dark:border-dred rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-dgreen dark:focus:ring-dred placeholder:opacity-50"
          />
        </div>

        {/* Selects */}
        <div className="flex flex-wrap gap-3">
          <select
            aria-label="Filter by location"
            value={filters.location}
            onChange={(e) => onChange('location', e.target.value)}
            className={selectClass}
          >
            <option value="all">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            aria-label="Filter by bike type"
            value={filters.bikeType}
            onChange={(e) => onChange('bikeType', e.target.value)}
            className={selectClass}
          >
            <option value="all">All types</option>
            {bikeTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            aria-label="Filter by brand"
            value={filters.brand}
            onChange={(e) => onChange('brand', e.target.value)}
            className={selectClass}
          >
            <option value="all">All brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          <select
            aria-label="Sort bikes"
            value={filters.sort}
            onChange={(e) => onChange('sort', e.target.value)}
            className={selectClass}
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </div>
      </div>

      {/* Result summary + clear */}
      <div className="flex items-center justify-between text-sm">
        <p className="text-black dark:text-white opacity-60">
          Showing <span className="font-semibold opacity-100">{resultCount}</span> of {totalCount} bikes
        </p>
        {isFiltering && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1.5 text-dgreen dark:text-dred font-semibold hover:underline underline-offset-4"
          >
            <FiX /> Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export default FilterList
