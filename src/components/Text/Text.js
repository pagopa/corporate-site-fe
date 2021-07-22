import React from 'react'

import Cta from '../Cta/Cta'
import './Text.sass'

const Text = ({ data, classes, locale }) => {
  const { blockOptions, iscentered, content } = data

  const { backgroundGraphics, blockPosition, blockWidth } = blockOptions

  const columns = {}

  if (blockPosition === 'center') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-2`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'left') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'right') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-3`
  }

  // {
  //   backgroundGraphics {
  //     fieldGroupName
  //     size
  //     xposition
  //     yposition
  //   }
  //   blockPosition
  //   blockWidth
  // }

  const { eyelet, title, text, note, link } = content

  return (
    <section className={`block --${classes} text${iscentered && ' --centered'}`}>
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${columns[blockWidth]}`}>
            {eyelet && <h4>{eyelet}</h4>}
            {title ? iscentered ? <h2>{title}</h2> : <h1>{title}</h1> : false}
            {text && (
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
            {link && (
              <Cta
                label={link.title}
                url={link.url}
                blank={link.target}
                locale={locale}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Text
