import React from 'react';

import pagopaColor from '../../images/pagopa.svg';
import pagopaLight from '../../images/pagopa-light.svg';
import './Logo.sass';

export const Logo = ({ title, version, menuOpen }: any) => {
  const logoSrc =
    version === 'light' ? pagopaLight : menuOpen ? pagopaLight : pagopaColor;
  return (
    <>
      <div className="logo">
        <img src={logoSrc} alt={title} />
      </div>
    </>
  );
};
