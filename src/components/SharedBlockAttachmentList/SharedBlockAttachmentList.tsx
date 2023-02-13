import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import { Cta } from '../../partials/Cta';

export const SharedBlockAttachmentList = ({
  linksAttachments,
  title,
}: Queries.STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS) => {
  const links = [
    ...(linksAttachments || []),
  ] as ReadonlyArray<Queries.STRAPI__COMPONENT_BLOCK_CONTEXT_LINK_ATTACHMENT>;

  return (
    <section className="block --block-useful-links">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {title && <h4>{title}</h4>}
            <ul>
              {links?.length &&
                links.map(({ id, link, attachment }) => {
                  return link && id && attachment?.url ? (
                    <li key={id}>
                      <Cta
                        label={link}
                        variant="link"
                        href={attachment?.url}
                        blank
                      />
                    </li>
                  ) : null;
                })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
