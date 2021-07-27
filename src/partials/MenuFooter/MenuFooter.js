import React from 'react'

import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'

import Cta from '../../components/Cta/Cta'

import './MenuFooter.sass'

const MenuFooter = () => {
  const { linksAttachments } = useWpOptionsPage().footer

  return (
    <nav className="menu-footer">
      <ul>
        {linksAttachments.map((item, key) => {
          const { footerLink, footerAttachment } = item

          const linkObj = {
            title: footerLink
              ? footerLink.title
              : footerAttachment
              ? footerAttachment.title
              : false,
            url: footerLink
              ? footerLink.url
              : footerAttachment
              ? footerAttachment.localFile.publicURL
              : false,
            blank: true,
          }

          return (
            <li key={key}>
              {linkObj.url && (
                <Cta
                  label={linkObj.title}
                  url={linkObj.url}
                  blank={linkObj.blank}
                  variant="link-simple"
                />
              )}
            </li>
          )
        })}
        <li>
          <button id="ot-sdk-btn" className="ot-sdk-show-settings cta --link-simple"><span>Impostazioni dei cookie</span></button>
        </li>
      </ul>
    </nav>
  )
}

export default MenuFooter

// footerAttachment {
//   localFile {
//     publicURL
//   }
//   title
// }
// footerLink {
//   target
//   title
//   url
// }
