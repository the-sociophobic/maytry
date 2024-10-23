import { FC } from 'react'

import { ImageType } from '../hooks/useContentful/types'
import useBlankImage from '../hooks/useBlankImage'
import Img from './Img'


export type ImgDummyProps = {
  img: ImageType | undefined
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
