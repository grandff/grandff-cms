import {defineField, defineType} from "sanity"; 

export const icon = defineType({
    name: "icon",
    type: "document",
    title: "Icon",
    fields: [
      defineField({
        name: "title",
        type: "string",
        description: "아이콘 이름을 입력해 주세요.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "string",
        description: "아이콘 설명을 입력해 주세요.",
      }),
      defineField({
        name: "icon",
        type: "file",
        description: "아이콘 파일을 올려주세요.",
        options: {
          accept: ".png, .jpg, .jpeg, .heic, .heif"
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