import React from 'react'

import Image from '../Image/Image'

const AttachmentsGrid = ({ data }) => {
  const { title, entries, blockOptions } = data

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

  return (
    <section className="block --block-attachments-grid">
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${columns[blockWidth]}`}>
            {title && <h1>{title}</h1>}
            <div className="row">
              {entries.map(({ icon, attachment, label }, key) => {

                return (
                  <div className="col-12 col-md-6 col-lg-4 d-flex" key={key}>
                    <article className="icon-box">
                      <div>
                        
                        {icon && (
                          <>
                            <div className="icon-box__icon">
                              <Image image={icon.localFile} alt="" />
                            </div>
                            {attachment && <h4 className="--primary --medium icon-box__title">{attachment?.title}</h4>}
                          </>
                        )}
                      </div>
                      {attachment && <a href={attachment?.localFile.publicURL} target="_blank" rel="noopener noreferrer" className="cta mt-0"><span>{label}</span></a>}
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AttachmentsGrid