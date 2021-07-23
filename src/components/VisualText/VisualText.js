import React from 'react'
import Cta from '../Cta/Cta'
import Image from '../Image/Image'

const VisualText = ({ data }) => {
  const { blockOptions, reverse, backgroundColor, content, visual } = data

  const { eyelet, title, text, link } = content

  const { backgroundGraphics } = blockOptions
  

  const visualSize = visual.width

  const columns = {
    small: {
      visual: `col-md-${reverse ? 5 : 4} offset-md-1`,
      content: `col-md-${reverse ? 4 : 5} offset-md-1`
    },
    half: {
      visual: `col-md-5${reverse ? '' : ' offset-md-1'}`,
      content: `col-md-5${reverse ? ' offset-md-1' : ''}`
    },
    big: {
      visual: `col-md-6`,
      content: `col-md-${backgroundColor ? 5 : 4}`
    },
    full: {
      visual: `col-md-9 offset-md-1`,
      content: `col-md-5 offset-md-5`
    }
  }


  const fullWidthLayout = visualSize === 'full'


  return (
    <section
      className={`block --block-visual-text${backgroundColor ? ' --has-bg-color' : ''}`}
      style={{ backgroundColor: backgroundColor ? backgroundColor : 'transparent'}}
    >
      <div className="container-fluid">
        <div
          className={`row align-items-center${reverse ? ' flex-row-reverse justify-content-end' : ''}`}
        >
          {fullWidthLayout && (
            <div className="col-12 col-md-10 offset-md-1">
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{title}</h1>}
            </div>
          )}
          <div className={`col-12 ${columns[visualSize].visual}`}>
            <div className="block__visual">
              <Image
                image={visual.image.localFile}
                title={visual.image.altText}
              />
            </div>
          </div>
          <div className={`col-12 ${columns[visualSize].content}`}>
            <div className="block__content">
              {!fullWidthLayout && eyelet && <h4>{eyelet}</h4>}
              {!fullWidthLayout && title && <h1>{title}</h1>}
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
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisualText
