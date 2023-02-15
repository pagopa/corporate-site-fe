import React from 'react';
import { Image } from '../../Image';

export const SharedBlockIntro = ({
  eyelet,
  title,
  image,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INTRO_Fragment) => {
  return (
    <section className="block --block-intro intro mb-0 --nocontent">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="intro__heading">
              <h4>{eyelet}</h4>
              <h1>{title}</h1>
            </div>
          </div>
        </div>
        {image && image?.localFile && (
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 d-flex align-items-center justify-content-center">
              {image && <Image data={image as Queries.STRAPI__MEDIA} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
