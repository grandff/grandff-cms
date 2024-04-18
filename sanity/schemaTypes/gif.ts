import {defineField, defineType} from "sanity"; 

export const gif = defineType({
    name: "gif",
    type: "document",
    title: "Gif",
    fields: [
      defineField({
        name: "title",
        type: "string",
        description: "gif 이름을 입력해 주세요.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "string",
        description: "gif 설명을 입력해 주세요.",
      }),
      defineField({
        name: "gif",
        type: "file",
        description: "gif 파일을 올려주세요.",
        options: {
          accept: ".gif",
        },
        validation: (Rule) => Rule.assetRequired(),
      }),
    ],
    preview: {
      select: {
        title: "title",
        subtitle: "description",
      },
    },
  });