import React from "react"

import { useWpOptionsPage } from "../../hooks/useWpOptionsPage"

import Logo from "../Logo/Logo"
import Socials from "../Socials/Socials"
import Language from "../Language/Language"
import MenuFooter from "../MenuFooter/MenuFooter"
import MenuContacts from "../MenuContacts/MenuContacts"

import "./Footer.sass"

const Footer = ({ locale }) => {
  // const date = new Date().getFullYear()
  const { companyData } = useWpOptionsPage()

  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="footer__top">
          <div className="row">
            <div className="col-12 col-md-3 col-lg-2">
              <Logo version="light" />
            </div>
            <div className="col-12 col-md-9 col-lg-10">
              <div className="row justify-content-between">
                <div className="col-12 col-md-6 col-lg-auto">
                  <h5>SEDI</h5>
                  <div dangerouslySetInnerHTML={{ __html: companyData }} />
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <h5>CONTATTI</h5>
                  <MenuContacts />
                </div>
                <div className="col-12 col-md-6 col-lg-auto">
                  <h5>SEGUICI SU</h5>
                  <Socials />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="row justify-content-between">
            <div className="col-auto">
              <MenuFooter />
            </div>
            <div className="col-auto">
              <Language currentLocale={locale} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
