import { FC } from 'react'

import useBlankImage from '../hooks/useBlankImage'
import Img from './Img'
import { ContentfulImageType } from '../types/contentful.type'


export type ImgDummyProps = {
  img: ContentfulImageType | undefined
  className?: string
  onClick?: () => void
  width?: number | `${number}` | undefined
  height?: number | `${number}` | undefined
}


const ImgDummy: FC<ImgDummyProps> = ({
  img,
  className,
  onClick,
  width,
  height,
}) => {
  const realImage = img?.small?.file?.url
  const blankImage = useBlankImage()

  return (
    <Img
      src={realImage || blankImage}
      className={`${className} ${!realImage && 'transparent'}`}
      onClick={onClick}
      width={width}
      height={height}
    />
  )
}


export default ImgDummy
