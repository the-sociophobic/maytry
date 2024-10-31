import { FC } from 'react'

import useBlankImage from '../hooks/useBlankImage'
import Img from './Img'
import { ContentfulImageType } from '../types/contentful.type'


export type ImgDummyProps = {
  img: ContentfulImageType | undefined
  className?: string
  onClick?: () => void
}


const ImgDummy: FC<ImgDummyProps> = ({
  img,
  className,
  onClick
}) => {
  const realImage = img?.small.file.url
  const blankImage = useBlankImage()

  return (
    <Img
      src={realImage || blankImage}
      className={`${className} ${!realImage && 'transparent'}`}
      onClick={onClick}
    />
  )
}


export default ImgDummy
