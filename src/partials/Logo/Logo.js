import React from 'react'

import pagopaColor from '../../images/pagopa.svg'
import pagopaLight from '../../images/pagopa-light.svg'
import './Logo.sass'

const Logo = ({ title, version }) => {
  const logoSrc = version === 'light' ? pagopaLight : pagopaColor
  return (
    <>
      <div className="logo">
        <img src={logoSrc} alt={title} />
      </div>
    </>
  )
}

export default Logo
