import React from 'react'

import { ContentfulFile } from '../types/contentful.type'
// import ResizeObserver from 'resize-observer-polyfill'


type Props = {
  src?: string
  style?: object
  className?: string
  file?: ContentfulFile | undefined
  alt?: string
  crop?: boolean
  urlParams?: string
  onClick?: () => void
}

type State = {
  portrait: boolean | undefined,
  containerRatio: number,
}


class Img extends React.Component<Props, State> {
  state = {
    portrait: undefined,
    containerRatio: 0,
  }

  imgRef: any = React.createRef()
  containerRef: any = React.createRef()
  resizeObs: any

  // componentDidMount = () =>
  //   this.resizeObs = new ResizeObserver(this.setOrientation.bind(this))
  //     .observe(this.containerRef.current)

  setOrientation = () =>
    this.setState({
      portrait: this.containerRef?.current?.offsetWidth / this.containerRef?.current?.offsetHeight >
        this.imgRef?.current?.width / this.imgRef?.current?.height
    })

  render = () => {
    const src = `${this.props.src || this.props?.file?.file?.url || ''}${this.props.urlParams || ''}`

    return src.length === 0 ? <></> : (
      <div
        ref={this.containerRef}
        className={`
          Img
          ${this.props.className}
          ${typeof this.state.portrait === "undefined" && "Img--hidden"}
        `}
        style={this.props.style}
        onClick={this.props.onClick}
      >
        <img
          ref={this.imgRef}
          alt={this.props.alt || this.props?.file?.file?.fileName || ''}
          src={src}
          className={`
            Img__img
            Img__img--${this.props.crop && (this.state.portrait ? "portrait" : "landscape")}
          `}
          onLoad={this.setOrientation}
        />
      </div>
    )
  }
}


export default Img
