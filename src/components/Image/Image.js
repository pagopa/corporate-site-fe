import React from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Image = ({ image, title }) => {
  const gatsbyImageSrc = getImage(image),
    altText = title !== "" ? title : "image"

  return <GatsbyImage image={gatsbyImageSrc} alt={altText} />
}

export default Image
