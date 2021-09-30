import React, { useContext, useEffect } from "react"

import { StaticImage } from "gatsby-plugin-image"

import { LocaleContext } from '../contexts/LocaleContext.js'

import Layout from '../partials/Layout'
import SeoHelmet from '../components/SeoHelmet'

const NotFoundPage = ({ location }) => {
  const locale = useContext(LocaleContext)

  return (
    <Layout locale={locale} location={location}>
      
      <section className="block --block-text text --centered">

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <h1>Ops! Non troviamo la<br />pagina che stai cercando.</h1>
              <p>Sembra che la pagina che stai cercando non esista su questo sito. Prova a digitare correttamente l’URL, se non funziona è possibile che la pagina sia stata eliminata o che sia in fase di progettazione</p>
              <div style={{
                paddingLeft: '10%',
                marginTop: '8rem',
                marginBottom: '8rem'
              }} >
                <StaticImage src="../images/404_a.png" alt="image" width={600} />
              </div>
                
            </div>
          </div>
        </div>

      </section>

    </Layout>
  )
}

export default NotFoundPage
