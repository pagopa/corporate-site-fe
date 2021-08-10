import React, { useContext, useState } from 'react'

import Reaptcha from 'reaptcha'

import axios from 'axios'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'

import './NewsletterBanner.sass'

const newsletterGroups = [
  {
    label: 'Cittadini',
    value: 47,
    checked: true
  }, {
    label: 'Pubbliche Amministrazioni',
    value: 48,
    checked: false
  }, {
    label: 'Aziende e Professionisti',
    value: 49,
    checked: false
  }, {
    label: 'Università e Centri di Ricerca',
    value: 50,
    checked: false
  }, {
    label: 'Giornalisti',
    value: 51,
    checked: false
  }
]

const Checkbox = ({ label, value, checked, classes }) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        value={value}
        id={`cb-inp-${value}`}
        className="newsletter-group"
        defaultChecked={checked}
      />
      <label htmlFor={`cb-inp-${value}`}>
        {label}
      </label>
    </div>
  )
}

const NewsletterBanner = () => {

  const { siteUrl } = useSiteMetadata()
  const locale = useContext(LocaleContext)

  const [loading, setLoading] = useState(false)

  let reaptchaInstance

  const reaptchaVerify = () => {
    setLoading(true)
    reaptchaInstance.execute()
  }

  const newsletterSubmit = (recaptchaResponse) => {

    const endpoint =
        'https://api.io.italia.it/api/payportal/v1/newsletters/io/lists/6/recipients'
  
    const input = document.querySelector('.newsletter-email'),
      optionsWrap = document.querySelector('.newsletter-banner__options'),
      groups = [...document.querySelectorAll('.newsletter-group:checked')],
      emailValue = input.value.trim(),
      groupsValue = []
  
    groups.forEach(g => groupsValue.push(g.value))
  
    if (input.checkValidity() && optionsWrap.querySelector('.newsletter-group:checked')) {
      axios.post(endpoint, {
        recaptchaToken: recaptchaResponse,
        email: emailValue,
        groups: groupsValue
      })
      .then(response => {
        console.warn(response)
      })
      .catch(error => {
        console.warn(error)
      })
      .then(() => {
        setLoading(false)
        reaptchaInstance.reset()
      })
    } else {
      console.error('not valid')
      setLoading(false)
      reaptchaInstance.reset()
    }
  }
  
  return (
    <>

      <section className="block --block-newsletter-banner newsletter-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1">
              <h3>Vuoi ricevere la<br />nostra Newsletter?</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1">
              <p className="mb-3">Segui le notizie per*:</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-md-6 col-lg-5 offset-lg-1">
              <ul className="newsletter-banner__options">
                {newsletterGroups.map((g, key) => {
                  const { label, value, checked } = g
                  return (
                    <li key={key}>
                      <Checkbox label={label} value={value} checked={checked} />
                    </li>
                  )
                })}
              </ul>
              <p className="--alternative --small"><em>* campo obbligatorio, con possibilità di risposta multipla</em></p>
            </div>
            <div className="col-12 col-md-6 col-lg-5 d-flex flex-column justify-content-between">
              <form onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Inserisci la tua email"
                  className="input newsletter-email"
                  required
                />
                <div className="d-flex align-items-center mt-3">
                  <button
                    type="button"
                    className={`cta --white newslette-submit mt-0${loading ? ' is-loading' : ''}`}
                    onClick={reaptchaVerify}
                  >
                    <span>Iscriviti</span>
                    <span className="loader"><span></span><span></span><span></span><span></span></span>
                  </button>
                  

                  <Reaptcha
                    ref={e => reaptchaInstance = e}
                    // sitekey="6LcBa7AaAAAAAEb8kvsHtZ_09Ctd2l0XqceFUHTe"
                    sitekey="6LeM5-wbAAAAANd-aiim0kKNYKnIORS5efzHCTr8"
                    size="invisible"
                    onVerify={newsletterSubmit}
                  />

                  <p className="--small --alternative mb-0 px-4">Seleziona un'opzione e/o inserisci la mail correttamente</p>
                </div>
              </form>

              <div className="mt-5">

                <p className="--alternative --small">
                  <em>Inserendo il tuo indirizzo email stai accettando la <a href={`${siteUrl}/${locale}/privacy-policy/`} target="_blank" rel="noopener noreferrer">nostra informativa sul trattamento dei dati personali</a> per la newsletter.</em>
                </p>
                <p className="--alternative --small">
                  <em>Form protetto tramite reCAPTCHA e <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a> e <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Termini di servizio</a> applicati.</em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default NewsletterBanner
