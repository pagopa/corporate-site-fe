import React from 'react'

import Image from 'components/Image/Image'
import BackgroundGraphics from 'components/BackgroundGraphics/BackgroundGraphics'

import 'components/Visual/Visual.sass'

const Visual = ({ data }) => {
  const {
    template,
    caption,
    image,
    blockOptions: { backgroundGraphics },
  } = data

  const layout = {
    wide: {
      columns: 'col-md-10 offset-md-1',
      type: 'wide',
    },
    sx: {
      columns: 'col-md-6 offset-md-1',
      type: 'partial',
    },
    dx: {
      columns: 'col-md-6 offset-md-6',
      type: 'partial',
    },
  }

  return (
    <section
      className={`block --block-visual visual --${layout[template].type}`}
    >
      {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />}

      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${layout[template].columns}`}>
            <figure>
              <Image image={image.localFile} title={image.altText} />
            </figure>
            {caption && (
              <figcaption>
                <p>{caption}</p>
              </figcaption>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Visual
