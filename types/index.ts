export interface Bike {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  owner: string;
  phone: string;
  description: string;
  imageUrl: string;
  slug: {current: string};
  location?: any;
  bikeType?: any;
  brand?: any;
  price: number;
}

export interface BikeType {
  _id: string;
  _type?: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  name: string;
  slug: {current: string};
}

export interface Brand {
  _id?: string;
  _type?: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  name: string;
  slug:{current: string};
}

export interface Location {
  _id: string;
  name: string;
  slug: {current: string};
}

export interface BikeCardProps extends Bike{
  vertical?: boolean;
  horizontal?: boolean;
}