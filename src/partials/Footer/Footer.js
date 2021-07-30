import React from 'react'

import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'

import Logo from '../Logo/Logo'
import Socials from '../Socials/Socials'
// import Language from '../Language/Language'
import MenuFooter from '../MenuFooter/MenuFooter'
import MenuService from '../MenuService/MenuService'

import './Footer.sass'

const Footer = ({ locale }) => {
  const { companyData } = useWpOptionsPage()

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer__top">
          
          <div className="row">
            <div className="col-12">
              <Logo version="light" />
            </div>
          </div>

          <div className="row justify-content-between">
            <div className="col-12 col-md-6">
              <div dangerouslySetInnerHTML={{ __html: companyData }} />
            </div>
            <div className="col-12 col-md-auto">
              <h5>SEGUICI SU</h5>
              <Socials />
            </div>
          </div>
          
        </div>
        <div className="footer__bottom">
          <div className="row justify-content-between flex-row-reverse">
            <div className="col-12 col-md-auto">
              <MenuFooter />
              {/* <Language currentLocale={locale} /> */}
            </div>
            <div className="col">
              <MenuService />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
