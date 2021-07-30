import React from 'react'

import parse from 'html-react-parser'

import Image from '../Image/Image'
import './Intro.sass'

const Intro = ({ data, featuredImage }) => {
  const { eyelet, title, text, image, usePostFeaturedImage } = data

  const coverImage = usePostFeaturedImage
    ? featuredImage?.node
    : image
    ? image
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
    <section
      className={`block --block-intro intro${
        !coverImage && !text ? ' mb-0 --nocontent' : ''
      }`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="intro__heading">
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{parse(title)}</h1>}
            </div>
          </div>
        </div>
        {coverImage && <ImageMarkup />}
        {text && (
          <div className={`row${image ? ' mt-5' : ''}`}>
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="wysiwyg">{parse(text)}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Intro
