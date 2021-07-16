import React from "react"

import Cta from "../Cta/Cta"

const UsefulLinks = ({ data, classes, locale }) => {
  const { title, links } = data

  return (
    <section className={`block --${classes}`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {title && <h4>{title}</h4>}
            <ul>
              {links.map(({ link }, key) => {
                return (
                  <li key={key}>
                    <Cta
                      label={link.title}
                      url={link.url}
                      blank={link.target}
                      variant="link"
                      locale={locale}
                    />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UsefulLinks
