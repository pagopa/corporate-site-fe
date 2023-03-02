import React, { useEffect } from 'react';
import { Cta } from '../Cta/';
import './MenuService.sass';

type MenuServiceProps = {
  menu: Queries.MainNavigationItemFragment[];
};

export const MenuService = ({ menu }: MenuServiceProps) => {
  useEffect(() => {
    const openOTPreferences = () => {
      if ('OneTrust' in window && window?.OneTrust)
        (window?.OneTrust as any)?.ToggleInfoDisplay();
    };
    const otButton = document.querySelector('.ot-preferences');
    otButton?.addEventListener('click', openOTPreferences);
    return () => otButton?.removeEventListener('click', openOTPreferences);
  }, []);

  return (
    <nav className="menu-service">
      <ul>
        {menu?.map((item: Queries.MainNavigationItemFragment | null) => {
          return item?.title && item?.path ? (
            <li key={item.path}>
              {item.path && (
                <Cta
                  label={item.title || ''}
                  href={`${process.env.API_URL}${item?.path}`}
                  blank
                  variant="link-simple"
                />
              )}
            </li>
          ) : null;
        })}
        <li>
          <button id="ot-sdk-btn" className="cta --link-simple ot-preferences">
            <span>Preferenze cookie MOCK</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
