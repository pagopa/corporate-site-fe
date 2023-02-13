import classNames from 'classnames';
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from 'gatsby-plugin-image';
import React from 'react';
import { SharedBlockBody } from '../SharedBlockBody';

import './SharedBlockVisualText.sass';

type VisualSize = 'Small' | 'Half' | 'Big' | 'Full';

export const SharedBlockVisualText = ({
  eyelet,
  title,
  body,
  image,
  caption,
  visualWidth,
}: Queries.STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT) => {
  const visualSize = (visualWidth as VisualSize) || 'Half';

  const columns: Record<VisualSize, { visual: string; content: string }> = {
    Small: {
      visual: `col-md-4 offset-md-1`,
      content: `col-md-5 offset-md-1`,
    },
    Half: {
      visual: `col-md-5 offset-md-1`,
      content: `col-md-5`,
    },
    Big: {
      visual: `col-md-6`,
      content: `col-md-6 col-lg-5`,
    },
    Full: {
      visual: `col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2`,
      content: `col-md-5 offset-md-5`,
    },
  };

  const fullWidthLayout = visualSize === 'Full';

  return (
    <section
      className={`block --block-visual-text`}
      style={{ backgroundColor: 'transparent' }}
    >
      {/* {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />} */}
      <div className="container-fluid">
        <div className={`row align-items-center`}>
          {fullWidthLayout && (
            <div className={classNames('col-9', columns['Full'].visual)}>
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{title}</h1>}
            </div>
          )}
          <div className={`col-12 ${columns[visualSize]?.visual}`}>
            {image?.localFile?.childImageSharp?.gatsbyImageData && (
              <div className="block__visual">
                <figure>
                  <GatsbyImage
                    image={
                      getImage(
                        image.localFile as ImageDataLike
                      ) as IGatsbyImageData
                    }
                    alt={image.alternativeText || 'featuredImage'}
                    title={image.alternativeText || ''}
                  />
                </figure>
                {caption && (
                  <figcaption>
                    <p>{caption}</p>
                  </figcaption>
                )}
              </div>
            )}
          </div>
          <div
            className={classNames(
              'col-12',
              fullWidthLayout
                ? columns[visualSize].visual
                : columns[visualSize].content
            )}
          >
            <div className={`block__${fullWidthLayout ? 'visual' : 'content'}`}>
              {!fullWidthLayout && eyelet && <h4>{eyelet}</h4>}
              {!fullWidthLayout && title && <h1>{title}</h1>}
              <SharedBlockBody data={body} />
              {/* {link && ( */}
              {/*   <Cta */}
              {/*     label={link.title} */}
              {/*     href={link.url} */}
              {/*     blank={link.target} */}
              {/*     className={additionalCta && additionalCta.link ? 'me-5' : ''} */}
              {/*   /> */}
              {/* )} */}
              {/* {additionalCta && additionalCta.link && ( */}
              {/*   <div className="py-4 d-inline-block"> */}
              {/*     <span className="me-4">{additionalCta.text}</span> */}
              {/*     {additionalCta.link && ( */}
              {/*       <Cta */}
              {/*         label={additionalCta.link.title} */}
              {/*         url={additionalCta.link.url} */}
              {/*         variant="link" */}
              {/*       /> */}
              {/*     )} */}
              {/*   </div> */}
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
