import React from 'react'

import { useWpOptionsPage } from 'hooks/useWpOptionsPage'

import Logo from 'partials/Logo/Logo'
import Socials from 'partials/Socials/Socials'
// import Language from 'partials/Language/Language'
import MenuFooter from 'partials/MenuFooter/MenuFooter'
import MenuService from 'partials/MenuService/MenuService'

import 'partials/Footer/Footer.sass'

const Footer = ({ locale }) => {
  const { companyData } = useWpOptionsPage()

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer__top">
          <div className="row">
            <div className="col-12 col-md-2">
              <Logo version="light" />
            </div>
            <div className="col-12 col-md-10 col-lg-8">
              <MenuService />
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          {/* <div className="row justify-content-between flex-row-reverse">
            <div className="col-12 col-md-auto">
              <Language currentLocale={locale} />
            </div>
            <div className="col">
            </div>
          </div> */}
          <div className="row justify-content-between flex-row-reverse">
            <div className="col-12 col-md-auto">
              <MenuFooter />
            </div>
            <div className="col-12 col-md-auto">
              <div className="d-flex mb-4">
                <h5 className="mb-0 me-5">SEGUICI SU:</h5>
                <Socials />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div dangerouslySetInnerHTML={{ __html: companyData }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
