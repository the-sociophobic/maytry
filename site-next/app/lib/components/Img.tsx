'use client'

import React, { FC, useState } from 'react'

import { ContentfulFile } from '../types/contentful.type'


type ImgProps = {
  src?: string
  style?: object
  className?: string
  file?: ContentfulFile | undefined
  alt?: string
  crop?: boolean
  urlParams?: string
  onClick?: () => void
}


const Img: FC<ImgProps> = (props) => {
  const [portrait, setPortrait] = useState<boolean | undefined>(undefined)
  const imgRef: any = React.createRef()
  const containerRef: any = React.createRef()

  const setOrientation = () =>
    setPortrait(containerRef?.current?.offsetWidth / containerRef?.current?.offsetHeight >
        imgRef?.current?.width / imgRef?.current?.height
    )

    const src = `${props.src || props?.file?.file?.url || ''}${props.urlParams || ''}`

    return src.length === 0 ? <></> : (
      <div
        ref={containerRef}
        className={`
          Img
          ${props.className}
          ${typeof portrait === "undefined" && "Img--hidden"}
        `}
        style={props.style}
        onClick={props.onClick}
      >
        <img
          ref={imgRef}
          alt={props.alt || props?.file?.file?.fileName || ''}
          src={src}
          className={`
            Img__img
            Img__img--${props.crop && (portrait ? "portrait" : "landscape")}
          `}
          onLoad={setOrientation}
        />
      </div>
    )
}


export default Img
