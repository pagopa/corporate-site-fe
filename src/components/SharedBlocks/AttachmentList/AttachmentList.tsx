import React from 'react';
import { useLocation } from '@reach/router';
import { Cta } from '../../../partials/Cta';

export const AttachmentList = ({
  linksAttachments: links,
  title,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS_Fragment) => {
  const { pathname } = useLocation();
  const TitleTag = pathname.includes('fondo-innovazione') ? 'h2' : 'h4';

  return (
    <section className="block block-useful-links">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {title && <TitleTag>{title}</TitleTag>}
            <ul>
              {links?.map(linkItem => {
                const { id, link, attachment, label } = linkItem || {};
                if (link || attachment || label) {
                  return id ? (
                    <li key={id}>
                      <Cta
                        label={label || attachment?.name || link || ''}
                        variant="link"
                        href={attachment?.url || link || undefined}
                        blank
                      />
                    </li>
                  ) : null;
                }
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
