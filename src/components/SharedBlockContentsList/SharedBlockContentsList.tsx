import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from 'gatsby-plugin-image';
import React from 'react';
import { SharedBlockBody } from '../SharedBlockBody';

import './SharedBlockContentsList.sass';

export const SharedBlockContentsList = ({
  contentsItems,
  template,
  title,
}: Queries.STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST) => {
  return (
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
                      className={`col-12 col-md-5${
                        isOdd ? ' offset-md-1' : ''
                      }${hasOffset ? ' offset' : ''}`}
                      key={key}
                    >
                      <div className={`blocks-list-entry`}>
                        {image && image?.localFile && (
                          <figure>
                            <GatsbyImage
                              image={
                                getImage(
                                  image.localFile
                                ) as IGatsbyImageData
                              }
                              alt={image.alternativeText || 'featuredImage'}
                            />
                          </figure>
                        )}
                        {title && <h4>{title}</h4>}
                        {body && <SharedBlockBody data={body} />}
                        {/* {link && ( */}
                        {/*   <Cta */}
                        {/*     label={link.title} */}
                        {/*     url={link.url} */}
                        {/*     blank={link.target} */}
                        {/*   /> */}
                        {/* )} */}
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
};
