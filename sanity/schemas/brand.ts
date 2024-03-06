import { Rule } from "sanity";

export const brand = {
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: Rule) => Rule.required().error("Name is required"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule: Rule) => Rule.required().error("Slug is required"),
    }
  ],
};