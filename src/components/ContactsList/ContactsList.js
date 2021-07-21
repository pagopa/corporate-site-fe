import React from 'react'

import './ContactsList.sass'

const ContactsList = ({ data, classes }) => {
  const { title, contacts: items } = data

  return (
    <section
      className={`block --${classes} contacts-list${
        !title ? ' --no-title' : ''
      }`}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
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
