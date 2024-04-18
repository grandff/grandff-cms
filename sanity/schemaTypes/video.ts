import {defineField, defineType} from "sanity"; 

export const video = defineType({
    name: "video",
    type: "document",
    title: "Video",
    fields: [
      defineField({
        name: "title",
        type: "string",
        description: "비디오 이름을 입력해 주세요.",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        type: "string",
        description: "비디오 설명을 입력해 주세요.",
      }),
      defineField({
        name: "video",
        type: "file",
        description: "비디오 파일을 올려주세요.",
        options: {
          accept: ".mp4, .mov",
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