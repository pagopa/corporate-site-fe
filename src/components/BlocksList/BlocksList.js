import React from 'react'

import Image from '../Image/Image'
import './BlocksList.sass'

const BlocksList = ({ data, classes }) => {
  const { template, title: blockTitle, items: blocks } = data

  const items = [...blocks]

  return (
    <section className={`block --${classes} blocks-list`}>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 col-lg-10 offset-lg-1 col-xl-9 offset-xl-2`}>
            {blockTitle && <h1>{blockTitle}</h1>}

            {items.length && (
              <div className="row">
                {items.map((block, key) => {
                  const { image, text } = block

                  const isOdd = key % 2
                  const hasOffset = template === 'staggered' && isOdd

                  return (
                    <div
                      className={`col-12 col-md-5${
                        isOdd ? ' offset-md-1' : ''
                      }${hasOffset ? ' offset' : ''}`}
                      key={key}
                    >
                      <div className={`blocks-list-entry`}>
                        {image && (
                          <figure>
                            <Image
                              image={image.localFile}
                              title={image.altText}
                            />
                          </figure>
                        )}
                        {text && (
                          <div
                            className="wysiwyg"
                            dangerouslySetInnerHTML={{ __html: text }}
                          />
                        )}
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

export default BlocksList
