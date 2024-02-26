import React from 'react'

const Page = () => {
  return (
    <section className='container min-h-[100vh]' >
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold'>Bikes</h1>
      </div>

      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h2 className='text-2xl font-bold'>Bike 1</h2>
            <p>Some details about the bike</p>
          </div>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h2 className='text-2xl font-bold'>Bike 2</h2>
            <p>Some details about the bike</p>
          </div>
          <div className='bg-gray-100 p-4 rounded-lg'>
            <h2 className='text-2xl font-bold'>Bike 3</h2>
            <p>Some details about the bike</p>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Page