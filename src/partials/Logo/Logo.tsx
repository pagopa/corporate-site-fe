import React from 'react';
import { useTranslation } from 'gatsby-plugin-react-i18next';

import pagopaColor from '../../images/pagopa.svg';
import pagopaLight from '../../images/pagopa-light.svg';
import './Logo.sass';

type LogoProps = {
  title: string;
  version?: string;
  menuOpen?: boolean;
  onClick?: () => void;
};

export const Logo = ({ title, version, menuOpen, onClick }: LogoProps) => {
  const { t } = useTranslation();
  const logoSrc =
    version === 'light' ? pagopaLight : menuOpen ? pagopaLight : pagopaColor;

  return (
    <>
      {onClick ? (
        <button
          className="logo"
          aria-label={t('backToHomepage') ?? undefined}
          onClick={onClick}
          tabIndex={menuOpen ? -1 : undefined}
          aria-hidden={menuOpen ? 'true' : undefined}
        >
          <img src={logoSrc} alt={title} />
        </button>
      ) : (
        <div className="logo">
          <img src={logoSrc} alt={title} />
        </div>
      )}
    </>
  );
};
