import {defineField, defineType} from "sanity"; 

export const img = defineType({
    name: "img",
    type: "document",
    title: "Image",
    fields: [
      defineField({
        name: "title",
        type: "string",
        description: "이미지 이름을 입력해 주세요.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "string",
        description: "이미지 설명을 입력해 주세요.",
      }),
      defineField({
        name: "img",
        type: "file",
        description: "이미지 파일을 올려주세요.",
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