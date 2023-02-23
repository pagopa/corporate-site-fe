import React from 'react';
import { Image } from '../../Image';
import { Body } from '../../Remark/Body';

import './ContentsList.sass';

export const ContentsList = ({
  contentsItems,
  template,
  title,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST_Fragment) => (
  <section className="block --block-blocks-list blocks-list">
    <div className="container-fluid">
      <div className="row">
        <div className={`col-12 col-lg-10 offset-lg-1 col-xl-9 offset-xl-2`}>
          {title && <h1>{title}</h1>}

          {contentsItems?.length && (
            <div className="row">
              {contentsItems.map((block, key) => {
                const { title, body, image } = block || {};

                const isOdd = key % 2;
                const hasOffset = template === 'Staggered' && isOdd;

                return (
                  <div
                    className={`col-12 col-md-5${isOdd ? ' offset-md-1' : ''}${
                      hasOffset ? ' offset' : ''
                    }`}
                    key={key}
                  >
                    <div className={`blocks-list-entry`}>
                      {image && <Image data={image as Queries.STRAPI__MEDIA} />}
                      {title && <h4>{title}</h4>}
                      {body && <Body data={body} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
);
