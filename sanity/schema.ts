import { type SchemaTypeDefinition } from 'sanity'
import { bike } from './schemas/bikes'
import { bikeType } from './schemas/bikeType'
import { brand } from './schemas/brand'
import { location } from './schemas/location'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bike, bikeType, brand, location ],
}
