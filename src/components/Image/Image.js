import React from 'react'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Image = ({ image, title, objectFit }) => {
  const altText = title !== '' ? title : ''

  const props = {}

  if (objectFit) {
    props.objectFit = objectFit
  }
  if (!image.childImageSharp && image.extension === 'svg') {
    return <img src={image.publicURL} alt={altText} />
  }

  const gatsbyImageSrc = getImage(image)

  return <GatsbyImage image={gatsbyImageSrc} alt={altText} {...props} />
}

export default Image
