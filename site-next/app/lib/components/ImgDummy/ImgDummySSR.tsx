'use server'

import { FC } from 'react'

import Img from '../Img'
import { ContentfulImageType } from '../../types/contentful.type'
import { getContentfulDataWithoutBadItems } from '../../hooks/useContentful'


export type ImgDummySSRProps = {
  img: ContentfulImageType | undefined
  className?: string
  width?: number | `${number}` | undefined
  height?: number | `${number}` | undefined
}


const ImgDummySSR: FC<ImgDummySSRProps> = async ({
  img,
  className,
  width,
  height,
}) => {
  const realImage = img?.small?.file?.url
  const contentful = await getContentfulDataWithoutBadItems()
  let blankImage: string | undefined

  for (const item of (contentful?.items || [])) {
    if (item.images?.[0]?.small?.file?.url)
      blankImage = item.images[0].small.file.url
  }

  return (
    <Img
      src={realImage || blankImage}
      className={`${className} ${!realImage && 'transparent'}`}
      width={width}
      height={height}
    />
  )
}


export { ImgDummySSR }
