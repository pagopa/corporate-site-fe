import type { ReactElement } from 'react';
import React from 'react';
import { BackgroundGraphics } from '../../BackgroundGraphics';
import { Image } from '../../Image';

type Template = 'Wide' | 'Left' | 'Right';

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

  return (
    <section
      className={`block --block-visual visual --${
        layout[template as Template].type
      }`}
    >
      <BackgroundGraphics left={left} top={top} size={size} />

      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${layout[template as Template].columns}`}>
            <Image data={image as Queries.STRAPI__MEDIA} />
          </div>
        </div>
      </div>
    </section>
  );
};
