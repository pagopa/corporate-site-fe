import React from 'react'

import Reaptcha from 'reaptcha'

import axios from 'axios'

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

const newsletterSubmit = (recaptchaResponse) => {

  const endpoint =
      'https://api.io.italia.it/api/payportal/v1/newsletters/io/lists/6/recipients'

  const input = document.querySelector('.newsletter-email'),
    groups = [...document.querySelectorAll('.newsletter-group:checked')],
    emailValue = input.value.trim(),
    groupsValue = []

  groups.forEach(g => groupsValue.push(g.value))

  if (input.checkValidity()) {
    axios.post(endpoint, {
      recaptchaToken: recaptchaResponse,
      email: emailValue,
      groups: groupsValue
    })
    .then((response) => {
      console.warn(response)
    })
    .catch((error) => {
      console.warn(error)
    })
  }
}

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

  let reaptchaInstance

  const reaptchaVerify = () => {
    reaptchaInstance.execute()
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
                <button
                  type="button"
                  className="cta --white newslette-submit"
                  onClick={reaptchaVerify}
                >
                  <span>Iscriviti</span>
                </button>

                <Reaptcha
                  ref={e => reaptchaInstance = e}
                  sitekey="6LcBa7AaAAAAAEb8kvsHtZ_09Ctd2l0XqceFUHTe"
                  size="invisible"
                  onVerify={newsletterSubmit}
                />
              </form>

              <div className="mt-5">

                <p className="--alternative --small">
                  <em>Inserendo il tuo indirizzo email stai accettando la nostra informativa sul trattamento dei dati personali per la newsletter.</em>
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
