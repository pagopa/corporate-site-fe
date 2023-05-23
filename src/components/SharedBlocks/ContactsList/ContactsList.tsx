import React from 'react';
import { PagoPA } from '../../../types';

import './ContactsList.sass';

const ContactsList = ({
  contacts,
  blockConf,
  title,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_CONTACTS_LIST_Fragment) => {
  const { BlockPosition, BlockWidth } = blockConf || {
    BlockPosition: '',
    BlockWidth: '',
  };

  // center default
  const columns: PagoPA.BlockConfig = {
    Standard: `col-md-10 offset-md-1 col-lg-8 offset-lg-2`,
    Wide: `col-md-10 offset-md-1`,
  };

  if (BlockPosition === 'Left') {
    columns.Standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`;
    columns.Wide = `col-md-10 offset-md-1`;
  }
  if (BlockPosition === 'Right') {
    columns.Standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`;
    columns.Wide = `col-md-10 offset-md-3`;
  }

  return (
    <section
      className={`block --block-contacts-list contacts-list${
        !title ? ' --no-title' : ''
      }`}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className={`col-12 ${columns[BlockWidth]}`}>
            {title && <h1>{title}</h1>}
            <div className="row">
              {contacts.map((item, key) => {
                const { title, email } = item;
                return (
                  <div className="col-12 col-md-6 d-flex" key={key}>
                    <div className="contacts-list__entry">
                      <div>
                        <h4>{title}</h4>
                      </div>
                      <div>
                        <a
                          href={`mailto:${email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mail-link"
                        >
                          {email}
                        </a>
                      </div>
                    </div>
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

export default ContactsList;
