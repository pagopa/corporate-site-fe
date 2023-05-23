import type { ReactElement } from 'react';
import React from 'react';
import { BackgroundGraphics } from '../../BackgroundGraphics';
import { Image } from '../../Image';

const templates = ['Wide', 'Left', 'Right'];

export const Visual = ({
  image,
  template,
  backgroundAnimation,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_Fragment): ReactElement => {
  const layout = {
    Wide: {
      columns: 'col-md-10 offset-md-1',
      type: 'wide',
    },
    Left: {
      columns: 'col-md-6 offset-md-1',
      type: 'partial',
    },
    Right: {
      columns: 'col-md-6 offset-md-6',
      type: 'partial',
    },
  };

  const { left, top, size } = backgroundAnimation || {};
  const { type, columns } = templates.includes(template)
    ? layout[template]
    : layout.Wide;

  return (
    <section className={`block --block-visual visual --${type}`}>
      <BackgroundGraphics left={left} top={top} size={size} />

      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${columns}`}>
            <Image data={image} />
          </div>
        </div>
      </div>
    </section>
  );
};
