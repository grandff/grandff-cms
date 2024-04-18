# Sanity Clean Content Studio

## 배포 방법
1. yarn build 실행
2. clodu flare pages에서 dist 폴더 업로드

## Query
```bash
// document type이 lottie인 데이터를 모두 가져옵니다.
*[_type == "lottie"]

*[_type == "lottie"] {
  title,
  description,
  lottie
}

*[_type == "lottie"] {
  title,
  description,
  // "lottie"는 alias입니다.
  // lottie.asset-> 을 통해서 실제 데이터를 가져옵니다.
  // 결론은 "lottie" 이름으로 lottie.asset의 참조 데이터의 모든 필드를 가져온다는 뜻입니다.
  "lottie": lottie.asset->
}

*[_type == "lottie"] {
  title,
  description,
  "lottie": lottie.asset-> {
    originalFilename,
    extension,
    url
  }
}
```

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)
