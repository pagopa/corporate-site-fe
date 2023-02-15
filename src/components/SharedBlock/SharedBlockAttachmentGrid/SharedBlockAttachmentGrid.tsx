import React from 'react';

export type BlockConf = {
  BlockPosition: 'Left' | 'Right' | 'Center';
  BlockWidth: 'Standard' | 'Wide';
};

export const SharedBlockAttachmentGrid = ({
  attachmentsGridItems,
  title,
  blockConf,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_ATTACHMENTS_GRID_Fragment) => {
  const { BlockPosition: blockPosition, BlockWidth: blockWidth } =
    (blockConf || {
      BlockPosition: 'Left',
      BlockWidth: 'Standard',
    }) as BlockConf;

  const columns: { Standard: string; Wide: string } = {
    Standard: `col-md-10 offset-md-1 col-lg-8 offset-lg-1`,
    Wide: `col-md-10 offset-md-1`,
  };

  if (blockPosition === 'Center') {
    columns.Standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-2`;
    columns.Wide = `col-md-10 offset-md-1`;
  }
  if (blockPosition === 'Right') {
    columns.Standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`;
    columns.Wide = `col-md-10 offset-md-3`;
  }

  return (
    <section className="block --block-attachments-grid">
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${columns[blockWidth]}`}>
            {title && <h1>{title}</h1>}
            <div className="row">
              {attachmentsGridItems?.map((attachmentItem, key) => {
                const { attachment, buttonLabel } = attachmentItem || {};
                return (
                  <div className="col-12 col-md-6 col-lg-4 d-flex" key={key}>
                    <article className="icon-box">
                      {attachment?.url && (
                        <a
                          href={attachment?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cta mt-0"
                        >
                          <span>{buttonLabel}</span>
                        </a>
                      )}
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
