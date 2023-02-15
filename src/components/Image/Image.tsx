import React from 'react';
import {
  GatsbyImage,
  GatsbyImageProps,
  getImage,
  IGatsbyImageData,
} from 'gatsby-plugin-image';
import { IGatsbyImageParent } from 'gatsby-plugin-image/dist/src/components/hooks';
import type { ReactElement } from 'react';

export type ImageProps = {
  data: Queries.STRAPI__MEDIA;
  caption?: string | null;
};

export const Image = ({ data, caption }: ImageProps): ReactElement => (
  <>
    <figure>
      <GatsbyImage
        image={
          getImage(data.localFile as IGatsbyImageParent) as IGatsbyImageData
        }
        alt={data.alternativeText || 'featuredImage'}
      />
    </figure>
    {caption && (
      <figcaption>
        <p>{caption}</p>
      </figcaption>
    )}
  </>
);
