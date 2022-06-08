import React from 'react'

import Cta from '../Cta/Cta'
import './CtaGrid.sass'

const CtaGrid = ({ data }) => {
  const { items } = data

  return (
    <section className="block --block-cta-grid cta-grid">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="row">
              {items?.map((item, key) => {
                const { title, text, link } = item
                return (
                  <div className="col-12 col-md-6 col-lg-4 d-flex" key={key}>
                    <div className="cta-grid__entry">
                      <div>
                        <h4 className="cta-grid__title --primary">{title}</h4>
                        <p className="cta-grid__text">{text}</p>
                      </div>
                      <div>
                        <Cta
                          label={link.title}
                          url={link.url}
                          blank={link.target}
                          variant="link"
                        />
                      </div>
                    </div>
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

export default CtaGrid
