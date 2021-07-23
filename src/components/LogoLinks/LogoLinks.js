import React from 'react'

import Image from '../Image/Image'
import './LogoLinks.sass'

const LogoLinks = ({ data }) => {
  const { title: blockTitle, items: logos } = data

  return (
    <section className="block --block-logo-links logo-links">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {blockTitle && <h4>{blockTitle}</h4>}

            {logos.length && (
              <div className="row">
                {logos.map((logo, key) => {
                  const { image, logoLink } = logo

                  return (
                    <div
                      className="col-12 col-sm-6 col-md-4 col-lg-3"
                      key={key}
                    >
                      <div className="logo-link">
                        <a
                          href={logoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {image && (
                            <Image
                              image={image.localFile}
                              title={image.altText}
                              objectFit="contain"
                            />
                          )}
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default LogoLinks

// ... on WpPage_Flexiblecontent_Body_Blocks_BlockLogoLinks {
//   fieldGroupName
//   title
//   items {
//     image {
//       localFile {
//         childImageSharp {
//           gatsbyImageData
//         }
//       }
//     }
//     logoLink
//   }
// }
