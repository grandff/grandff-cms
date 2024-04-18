import {defineField, defineType} from "sanity"; 

export const font = defineType({
    name: "font",
    type: "document",
    title: "Font",
    fields: [
      defineField({
        name: "title",
        type: "string",
        description: "폰트 이름을 입력해 주세요.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "string",
        description: "폰트 설명을 입력해 주세요.",
      }),
      defineField({
        name: "font",
        type: "file",
        description: "폰트 파일을 올려주세요.",
        options: {
          accept: ".ttf, .otf, .zip",
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