import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { IGatsbyImageParent } from 'gatsby-plugin-image/dist/src/components/hooks';
import type { ReactElement } from 'react';
import React, { useEffect, useRef } from 'react';

export type ImageProps = {
  data: Queries.ImageFragment | Queries.STRAPI__MEDIA;
  caption?: string | null;
  className?: string;
};

export const Image = ({
  data,
  caption,
  className,
}: ImageProps): ReactElement => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fix W3C errors
    const fixAttributes = () => {
      const images = container.querySelectorAll('img');

      images.forEach(img => {
        if (
          img.getAttribute('alt') === '' &&
          img.getAttribute('role') === 'presentation'
        ) {
          img.removeAttribute('role');
        }

        const height = img.getAttribute('height');
        if (height && height.includes('.')) {
          const roundedHeight = Math.round(parseFloat(height)).toString();
          if (height !== roundedHeight) {
            img.setAttribute('height', roundedHeight);
          }
        }

        const width = img.getAttribute('width');
        if (width && width.includes('.')) {
          const roundedWidth = Math.round(parseFloat(width)).toString();
          if (width !== roundedWidth) {
            img.setAttribute('width', roundedWidth);
          }
        }
      });
    };

    fixAttributes();

    const observer = new MutationObserver(() => {
      fixAttributes();
    });

    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <figure ref={containerRef} className={className}>
      <GatsbyImage
        image={
          getImage(data.localFile as IGatsbyImageParent) as IGatsbyImageData
        }
        alt={data.alternativeText || ''}
      />
      {caption && (
        <figcaption>
          <p>{caption}</p>
        </figcaption>
      )}
    </figure>
  );
};
