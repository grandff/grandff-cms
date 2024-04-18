import {defineField, defineType} from "sanity"; 

export const logo = defineType({
    name: "logo",
    type: "document",
    title: "Logo",
    fields: [
      defineField({
        name: "title",
        type: "string",
        description: "로고 이름을 입력해 주세요.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "string",
        description: "로고 설명을 입력해 주세요.",
      }),
      defineField({
        name: "logo",
        type: "file",
        description: "로고 파일을 올려주세요.",
        options: {
          accept: ".png, .jpg, .jpeg, .svg"
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