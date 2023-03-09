import React from 'react';

import { Image } from '../../Image';
import { Body } from '../../Remark';

import './MapBox.sass';

export const MapBox = ({
  image,
  mapBoxItems,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_MAP_BOX_Fragment) => {
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
                      <Image data={image} />
                    </figure>
                  </div>
                )}
                <div className="col-12 col-md-7">
                  <div className="map-box__locations">
                    {mapBoxItems.map((item, key) => {
                      const { title, body } = item;
                      return (
                        <div className="location" key={key}>
                          <h5 className="location__name">{title}</h5>
                          <Body data={body} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
