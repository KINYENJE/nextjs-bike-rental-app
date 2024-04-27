import { Rule } from "sanity";

export const bike = {
  name: "bike",
  title: "Bike",
  type: "document",
  fields: [
    {
      name: "owner",
      title: "Owner Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Name is required"),
    },
    {
      name: "phone",
      title: "Phone Number( 07xxxxxxxx )",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Phone is required"),

    },
    {
      name: "image",
      title: "Image",
      type: "image",
      validation: (Rule: Rule) => Rule.required().error("Image is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "owner",
      },
      validation: (Rule: Rule) => Rule.required().error("Slug is required"),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: [{type: 'location'}],
      validation: (Rule: Rule) => Rule.required().error("Location is required"),
    },
    {
      name: 'bikeType',
      title: 'Bike Type',
      type: 'reference',
      to: [{type: 'bikeType'}],
      validation: (Rule: Rule) => Rule.required().error("Bike Type is required"),
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
      validation: (Rule: Rule) => Rule.required().error("Brand is required"),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      defaultValue: "No description",
    },
    {
      name: "price",
      title: "Price in Kshs",
      type: "number",
      validation: (Rule: Rule) => Rule.required().error("Price is required"),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString() 
    },
   
    
  ],

};
