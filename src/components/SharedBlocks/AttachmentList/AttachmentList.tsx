import React from 'react';
import { Cta } from '../../../partials/Cta';

export const AttachmentList = ({
  linksAttachments: links,
  title,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS_Fragment) => {
  return (
    <section className="block --block-useful-links">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {title && <h4>{title}</h4>}
            <ul>
              {links?.map(linkItem => {
                const { id, link, attachment } = linkItem || {};
                // simpleLink is a field populated ex "Hello | www.google.it"
                const isSimpleLink = link.split('|').length > 1 ? true : false;
                return id && link && (attachment?.url || isSimpleLink) ? (
                  <li key={id}>
                    <Cta
                      label={isSimpleLink ? link.split('|')[0] : link}
                      variant="link"
                      href={attachment?.url || link.split('|')[1]}
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
