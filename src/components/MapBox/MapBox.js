import React from 'react'

import Image from 'components/Image/Image'

import './MapBox.sass'

const MapBox = ({ data }) => {
  const { image, items } = data

  return (
    <section className="block --block-map-box map-box">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="map-box__inner">
              <div className="row justify-content-center">
                {image && (
                  <div className="col-12 col-md-5 pe-md-0">
                    <figure>
                      <Image image={image.localFile} title="" />
                    </figure>
                  </div>
                )}
                <div className="col-12 col-md-7">
                  <div className="map-box__locations">
                    {items.map((item, key) => {
                      const { title, text } = item
                      return (
                        <div className="location" key={key}>
                          <h5 className="location__name">{title}</h5>
                          <p>{text}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapBox
