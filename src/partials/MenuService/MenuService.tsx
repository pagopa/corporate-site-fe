import React, { useEffect } from 'react';

import { Cta } from '../Cta/';

import './MenuService.sass';

export const MenuService = () => {
  const linksAttachments: any[] = [];

  useEffect(() => {
    const openOTPreferences = () => {
      // @ts-ignore
      window?.OneTrust && window.OneTrust.ToggleInfoDisplay();
    };
    const otButton = document.querySelector('.ot-preferences');
    otButton?.addEventListener('click', openOTPreferences);
    return () => otButton?.removeEventListener('click', openOTPreferences);
  }, []);

  return (
    <nav className="menu-service">
      <ul>
        {linksAttachments?.map((item, key) => {
          const { footerLink, footerAttachment } = item;

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
          };

          return (
            <li key={key}>
              {linkObj.url && (
                <Cta
                  label={linkObj.title}
                  url={linkObj.url}
                  blank={linkObj.blank}
                  variant="link-simple"
                  href="#"
                />
              )}
            </li>
          );
        })}
        <li>
          <button id="ot-sdk-btn" className="cta --link-simple ot-preferences">
            <span>Preferenze cookie</span>
          </button>
          {/* ot-sdk-show-settings */}
        </li>
      </ul>
    </nav>
  );
};
