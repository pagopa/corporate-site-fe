import React from 'react'
import Cta from '../Cta/Cta'
import Image from '../Image/Image'

const VisualText = ({ data, classes, locale }) => {
  const { reverse, backgroundColor, content, visual } = data

  const visualWidth = parseInt(visual.width)
  const fullWidthLayout = visualWidth > 8

  let visualColumns, contentColumns

  const { eyelet, title, text, link } = content

  if (visual.image && visualWidth) {
    if (!reverse) {
      if (visualWidth <= 5) {
        visualColumns = `col-md-${visualWidth} offset-md-1`
        contentColumns = `col-md-5${visualWidth < 5 ? ' offset-md-1' : ''}`
      } else {
        if (visualWidth > 5 && visualWidth < 9) {
          visualColumns = `col-md-${visualWidth}`
          contentColumns = `col-md-${backgroundColor ? 5 : 4}`
        } else if (visualWidth === 9) {
          visualColumns = `col-md-${visualWidth} offset-md-1`
          contentColumns = `col-md-5 offset-md-5`
        }
      }
    } else {
      if (visualWidth <= 5) {
        visualColumns = `col-md-5`
        contentColumns = `col-md-${visualWidth} offset-md-1`
      }
    }
  }

  return (
    <section
      className={`block --${classes}${
        backgroundColor ? ' --has-bg-color' : ''
      }`}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
      }}
    >
      <div className="container-fluid">
        <div
          className={`row align-items-center${
            reverse ? ' flex-row-reverse justify-content-end' : ''
          }`}
        >
          {fullWidthLayout && (
            <div className="col-12 col-md-10 offset-md-1">
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{title}</h1>}
            </div>
          )}
          <div className={`col-12 ${visualColumns}`}>
            <div className="block__visual">
              <Image
                image={visual.image.localFile}
                title={visual.image.altText}
              />
            </div>
          </div>
          <div className={`col-12 ${contentColumns}`}>
            <div className="block__content">
              {!fullWidthLayout && eyelet && <h4>{eyelet}</h4>}
              {!fullWidthLayout && title && <h1>{title}</h1>}
              {text && (
                <div
                  className="wysiwig"
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
      </div>
    </section>
  )
}

export default VisualText
