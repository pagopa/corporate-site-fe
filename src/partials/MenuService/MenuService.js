import React, { useEffect } from 'react'

import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'

import Cta from '../../components/Cta/Cta'

import './MenuService.sass'

const openOTPreferences = () => {
  
//   if (OneTrust) OneTrust.ToggleInfoDisplay()
}

const MenuService = () => {
  const { linksAttachments } = useWpOptionsPage().footer


  useEffect(() => {
    const otButton = document.querySelector('.ot-sdk-show-settings')

    otButton.addEventListener('click', openOTPreferences)
    return () => otButton.removeEventListener('click', openOTPreferences)
  }, [])

  return (
    <nav className="menu-service">
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
          <button id="ot-sdk-btn" className="ot-sdk-show-settings cta --link-simple"><span>Preferenze cookie</span></button>
        </li>
      </ul>
    </nav>
  )
}

export default MenuService

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
