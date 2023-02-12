import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from 'gatsby-plugin-image';
import React from 'react';
import { SharedBlockBody } from '../SharedBlockBody';

import './SharedBlockVisualText.sass';

export const SharedBlockVisualText = ({
  eyelet,
  title,
  body,
  image,
  additionalCta,
  caption,
  ...block
}: any) => {
  const { reverse, backgroundColor, visual } = block || {};

  const visualSize: 'small' | 'half' | 'big' | 'full' = visual?.width;

  const columns = {
    small: {
      visual: `col-md-${reverse ? 5 : 4} offset-md-1`,
      content: `col-md-${reverse ? 4 : 5} offset-md-1`,
    },
    half: {
      visual: `col-md-5${reverse ? '' : ' offset-md-1'}`,
      content: `col-md-5${reverse ? ' offset-md-1' : ''}`,
    },
    big: {
      visual: `col-md-6`,
      content: `col-md-6 col-lg-5`,
    },
    full: {
      visual: `col-md-9 offset-md-1`,
      content: `col-md-5 offset-md-5`,
    },
  };

  const fullWidthLayout = visualSize === 'full';

  return (
    <section
      className={`block --block-visual-text${
        backgroundColor ? ' --has-bg-color' : ''
      }`}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
      }}
    >
      {/* {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />} */}

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
          <div className={`col-12 ${columns['half']?.visual}`}>
            <div className="block__visual">
              <figure>
                <GatsbyImage
                  image={
                    getImage(
                      image.localFile as ImageDataLike
                    ) as IGatsbyImageData
                  }
                  alt={image.alternativeText || 'featuredImage'}
                  title={image.alternativeText}
                />
              </figure>
              {caption && (
                <figcaption>
                  <p>{caption}</p>
                </figcaption>
              )}
            </div>
          </div>
          <div className={`col-12 ${columns['half']?.content}`}>
            <div className="block__content">
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
