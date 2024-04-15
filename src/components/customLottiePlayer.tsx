/* eslint-disable react/prop-types */
import {getFile} from '@sanity/asset-utils'
import {Stack} from '@sanity/ui'
import {ComponentType} from 'react'
import {type FileValue, type ObjectInputProps, type ObjectSchemaType} from 'sanity'
import {Controls, Player} from '@lottiefiles/react-lottie-player'

export const CustomLottiePlayerInput: ComponentType<
  ObjectInputProps<FileValue, ObjectSchemaType>
> = (props) => {
  const value = props.value
  if (!value) return props.renderDefault(props)
  const {asset} = value
  if (!asset) return props.renderDefault(props)
  const file = getFile(asset, {
    dataset: 'production', // 자신의 dataset 이름으로 변경
    projectId: 'n7rpffi2', // 자신의 projectId 이름으로 변경
  })
  const url = file.asset.url // lottie 파일의 url
  return (
    <Stack space={3}>
      <Player autoplay loop src={url} style={{height: '300px', width: '300px'}}>
        <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug', '']} />
      </Player>
      {props.renderDefault({
        ...props,
        onChange: (value) => {
          props.onChange(value)
        },
      })}
    </Stack>
  )
}
