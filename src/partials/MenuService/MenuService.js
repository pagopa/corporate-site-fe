import React, { useEffect } from 'react'

import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'

import Cta from '../../components/Cta/Cta'

import './MenuService.sass'


const MenuService = () => {
  const { linksAttachments } = useWpOptionsPage().footer

  useEffect(() => {
    const openOTPreferences = () => {
      if (window.OneTrust) window.OneTrust.ToggleInfoDisplay()
    }
    const otButton = document.querySelector('.ot-preferences')
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
          <button id="ot-sdk-btn" className="cta --link-simple ot-preferences"><span>Preferenze cookie</span></button>
          {/* ot-sdk-show-settings */}
        </li>
      </ul>
    </nav>
  )
}

export default MenuService
