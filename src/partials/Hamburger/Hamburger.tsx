import React, { MouseEventHandler, forwardRef } from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import './Hamburger.sass';

export const Hamburger = forwardRef<
  HTMLButtonElement,
  {
    handler: MouseEventHandler<HTMLButtonElement>;
    isOpen: boolean;
  }
>(({ handler, isOpen }, ref) => {
  const { t } = useTranslation();

  return (
    <button
      ref={ref}
      className="hamburger"
      onClick={handler}
      aria-label={isOpen ? t('closeMenu') : t('openMenu')}
      aria-expanded={isOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
});

Hamburger.displayName = 'Hamburger';
