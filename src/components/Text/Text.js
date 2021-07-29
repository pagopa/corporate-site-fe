import React from 'react'

import parse from 'html-react-parser'

import BackgroundGraphics from '../BackgroundGraphics/BackgroundGraphics'
import Cta from '../Cta/Cta'
import './Text.sass'

const Text = ({ data }) => {
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

  const { eyelet, title, text, link } = content

  return (
    <section className={`block --block-text text${iscentered ? ' --centered' : ''}`}>
      
      {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />}

      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${columns[blockWidth]}`}>
            {eyelet && <h4>{eyelet}</h4>}
            {title ? iscentered ? <h2>{parse(title)}</h2> : <h1>{parse(title)}</h1> : false}
            {text && (
              <div className="wysiwyg">
                {parse(text)}
              </div>
            )}
            {link && (
              <Cta
                label={link.title}
                url={link.url}
                blank={link.target}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Text
