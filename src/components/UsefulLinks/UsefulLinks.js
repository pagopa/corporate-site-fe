import React from 'react'

import Cta from '../Cta/Cta'

const UsefulLinks = ({ data }) => {
  const { title, links } = data


  return (
    <section className="block --block-useful-links">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {title && <h4>{title}</h4>}
            <ul>
              {links.map(({ usefulLink, usefulAttachment }, key) => {
                const linkObj = {
                  title: usefulLink ? usefulLink.title : usefulAttachment ? usefulAttachment.title : false,
                  url: usefulLink ? usefulLink.url : usefulAttachment ? usefulAttachment.localFile.publicURL : false,
                  blank: usefulLink ? usefulLink.target : usefulAttachment ? true : false
                }

                return (
                  <li key={key}>
                    {linkObj.url && <Cta
                      label={linkObj.title}
                      url={linkObj.url}
                      blank={linkObj.blank}
                      variant="link"
                    />}
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
