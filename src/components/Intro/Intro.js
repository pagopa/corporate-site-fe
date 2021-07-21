import React from 'react'

import Image from '../Image/Image'
import './Intro.sass'

const Intro = ({ data, classes, featuredImage }) => {
  const { eyelet, title, text, image } = data

  const coverImage = image
    ? image
    : featuredImage
      ? featuredImage.node
      : false
      
  const ImageMarkup = () => {
    if (image) {
      return (
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <Image image={coverImage.localFile} title={coverImage.altText} />
          </div>
        </div>
      )
    } else {
      return <Image image={coverImage.localFile} title={coverImage.altText} />
    }
  }

  return (
    <header className={`block --${classes} intro`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="intro__heading">
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{title}</h1>}
            </div>
          </div>
        </div>
        {coverImage && <ImageMarkup />}
        {text && (
          <div className={`row${image ? ' mt-5' : ''}`}>
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Intro
