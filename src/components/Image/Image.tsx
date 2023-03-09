import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { IGatsbyImageParent } from 'gatsby-plugin-image/dist/src/components/hooks';
import type { ReactElement } from 'react';
import React from 'react';

export type ImageProps = {
  data: Queries.ImageFragment | Queries.STRAPI__MEDIA;
  caption?: string | null;
  className?: string;
};

export const Image = ({
  data,
  caption,
  className,
}: ImageProps): ReactElement => (
  <>
    <figure className={className}>
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
