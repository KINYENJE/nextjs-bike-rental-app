import { BikeType, Location, Brand, Bike } from "../../types"


export const LocationsConstantData: Location[] = [
  {
    _id: '3211c847-5282-4405-b005-1ca2eef376c7',
    name: 'roysambu',
    slug: { current: 'roysambu' }
  },
  {
    _id: '34cb7b27-3b8f-4397-8c40-97699ee52a3f',
    name: 'nairobi',
    slug: { current: 'nairobi' }
  },
  {
    _id: '7ce0d758-027f-4a6a-b61a-5a6a2b016eed',
    name: 'Thika',
    slug: { current: 'thika' }
  },
  {
    _id: '9102fccd-cca5-438b-810e-3520ba9f25c9',
    name: 'Juja',
    slug: { current: 'juja' }
  }
]


export const BikeTypesConstantData: BikeType[] = [
  {
    _id: '6a484c3a-9e4e-4517-b1a6-b59d4c2d8751',
    name: 'mountain',
    slug: { current: 'mountain' }
  },
  {
    _id: 'f59af4b5-0fc1-4fdc-a6b6-f9fce2002ab9',
    name: 'racing',
    slug: { current: 'racing' }
  }
]
export const BrandsConstantData: Brand[] = [
  {
    _id: '1c0411d9-ca5f-4ecb-8e75-86e409dfd829',
    name: 'peugeot',
    slug: { current: 'peugeot' }
  },
  {
    _id: '57b57fde-315e-4b79-9788-f290f00602b0',
    name: 'Raleigh',
    slug: { current: 'raleigh' }
  },
  {
    _id: '87609458-b355-4fcf-820f-b77001e666bd',
    name: 'norco',
    slug: { current: 'norco' }
  },
  {
    _id: 'c3f609bf-8715-4d0a-a2ff-1d40518b4063',
    name: 'voltebyk',
    slug: { current: 'voltebyk' }
  },
  {
    _id: 'd9f1ec8b-d049-4e08-aac2-3e3a6d8692c0',
    name: 'not available',
    slug: { current: 'not-available' }
  }
]

export const BikesConstantData: Bike[] = [
  {
    imageUrl: 'https://cdn.sanity.io/images/8i24trdf/production/6d6e88259e9e3c11ac845c2752c885e18f3fe348-1920x1285.jpg',
    _createdAt: '2024-03-01T05:14:19Z',
    brand: [ [Object] ],
    slug: { current: 'quiver-bikes' },
    owner: 'Quiver bikes',
    location: [ [Object] ],
    bikeType: { name: 'mountain', _id: '6a484c3a-9e4e-4517-b1a6-b59d4c2d8751' },
    _updatedAt: '2024-03-01T05:14:19Z',
    _id: '0ed0288c-e107-4f59-8b29-f2a827034f09',
    price: 100,
    phone: '0792360718'
  },
  {
    imageUrl: 'https://cdn.sanity.io/images/8i24trdf/production/29ae905734e0793d44122b73521ceb4e51142e95-1920x1280.jpg',
    _createdAt: '2024-02-26T06:53:52Z',
    brand: [ [Object] ],
    price: 100,
    location: [ [Object] ],
    _updatedAt: '2024-02-27T22:29:26Z',
    _id: '1789cb46-252c-4bc0-a7f3-ad59e054a35d',
    phone: '0792360716',
    slug: { current: 'lunani-bikes' },
    owner: 'lunani bikes',
    bikeType: { name: 'mountain', _id: '6a484c3a-9e4e-4517-b1a6-b59d4c2d8751' }
  },
  {
    bikeType: { name: 'racing', _id: 'f59af4b5-0fc1-4fdc-a6b6-f9fce2002ab9' },
    _updatedAt: '2024-02-27T22:35:03Z',
    _id: '353d619f-122a-4948-a552-62c1f42449e8',
    brand: [ [Object] ],
    price: 99,
    phone: '+254 701685317',
    owner: 'contez bikez',
    imageUrl: 'https://cdn.sanity.io/images/8i24trdf/production/634a343d02f0b7afe8a9eee1d88da64e31c42c08-4440x2960.jpg',
    _createdAt: '2024-02-27T22:35:03Z',
    slug: { current: 'contez-bikez' },
    location: [ [Object] ]
  },
  {
    slug: { current: 'juma' },
    location: [ [Object] ],
    _id: '3ac490fe-ca83-4316-aef0-d8da0b6bc3af',
    imageUrl: 'https://cdn.sanity.io/images/8i24trdf/production/14cab63c1d6dda754c3bed4891ef05f1c1b1176d-1920x1063.jpg',
    _createdAt: '2024-03-01T05:18:00Z',
    brand: [ [Object] ],
    price: 100,
    phone: '0793456890',
    bikeType: { name: 'racing', _id: 'f59af4b5-0fc1-4fdc-a6b6-f9fce2002ab9' },
    owner: 'Juma',
    _updatedAt: '2024-03-01T05:18:00Z'
  },
  {
    owner: 'contez bikez',
    location: [ [Object] ],
    bikeType: { name: 'mountain', _id: '6a484c3a-9e4e-4517-b1a6-b59d4c2d8751' },
    _updatedAt: '2024-02-27T22:42:04Z',
    imageUrl: 'https://cdn.sanity.io/images/8i24trdf/production/e877e24d147557ecf211e04f72306a1c1b9fd750-1920x1280.jpg',
    _createdAt: '2024-02-27T22:42:04Z',
    price: 100,
    slug: { current: 'contez-bikez-1' },
    _id: '6ecd7de5-ece6-4f17-b418-2cbeb4424dee',
    brand: [ [Object] ],
    phone: '+254 701685317'
  },
  {
    bikeType: { name: 'mountain', _id: '6a484c3a-9e4e-4517-b1a6-b59d4c2d8751' },
    imageUrl: 'https://cdn.sanity.io/images/8i24trdf/production/d87a6969c7b7cab1f7f97ff22c00e303ce408783-679x668.jpg',
    _createdAt: '2024-03-05T07:34:18Z',
    price: 100,
    phone: '0792360716',
    slug: { current: 'bisket-bikes' },
    location: [ [Object] ],
    _id: 'a6c487e6-1447-45a5-9b47-5b065db77400',
    brand: [ [Object] ],
    owner: 'Bisket bikes',
    _updatedAt: '2024-03-05T07:34:18Z'
  }
]