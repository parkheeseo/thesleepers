import { defineField, defineType } from "sanity";

export const worksInfo = defineType({
  name: "worksInfo",
  title: "Works",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "medium",
      title: "Medium",
      type: "string",
    }),
    defineField({
      name: "dimension",
      title: "Dimension",
      type: "string",
    }),
    defineField({
      name: "credit",
      title: "Credit",
      type: "text",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Works" };
    },
  },
});
