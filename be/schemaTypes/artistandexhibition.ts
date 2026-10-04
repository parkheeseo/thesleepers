import { defineField, defineType } from "sanity";

export const artistAndExhibition = defineType({
  name: "artistAndExhibition",
  title: "Artist and Exhibition",
  type: "document",
  fields: [
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "image",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
    }),
    defineField({
      name: "reference",
      title: "Reference",
      type: "text",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Artist and Exhibition" };
    },
  },
});
