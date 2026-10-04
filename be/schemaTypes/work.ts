import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "number",
      title: "Number",
      type: "string",
      description: "Taken from the image file name. 002.jpg is 2.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "number",
      media: "thumbnail",
    },
    prepare({ title, media }) {
      return { title: title ? String(title) : "Work", media };
    },
  },
});
