import {defineField, defineType} from "sanity"; 

export const capture = defineType({
    name: "capture",
    type: "document",
    title: "Capture",
    fields: [
      defineField({
        name: "title",
        type: "string",
        description: "캡처화면 이름을 입력해 주세요.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "string",
        description: "캡처화면 설명을 입력해 주세요.",
      }),
      defineField({
        name: "capture",
        type: "file",
        description: "캡처화면 파일을 올려주세요.",
        options: {
          accept: ".png, .jpg, .jpeg",
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