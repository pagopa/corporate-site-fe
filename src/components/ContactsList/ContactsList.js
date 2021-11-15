import React from 'react'

import './ContactsList.sass'

const ContactsList = ({ data }) => {
  const { blockOptions, title, contacts: items } = data

  const { 
    // backgroundGraphics, 
    blockPosition, 
    blockWidth 
  } = blockOptions

  const columns = {}

  if (blockPosition === 'center') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-2`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'left') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'right') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-3`
  }

  return (
    <section
      className={`block --block-contacts-list contacts-list${
        !title ? ' --no-title' : ''
      }`}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className={`col-12 ${columns[blockWidth]}`}>
            {title && <h1>{title}</h1>}
            <div className="row">
              {items.map((item, key) => {
                const { title, email } = item
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
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactsList
