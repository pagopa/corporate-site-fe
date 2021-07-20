import React from 'react'

import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Image = ({ image, title, objectFit }) => {
  const gatsbyImageSrc = getImage(image),
    altText = title !== '' ? title : 'image'
  
  const props = {}

  if (objectFit) {
    props.objectFit = objectFit
  }

  return <GatsbyImage image={gatsbyImageSrc} alt={altText} {...props} />
}

export default Image
