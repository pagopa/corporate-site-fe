import React, { useEffect, useState } from 'react'

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

const Checkbox = ({ label, value, checked }) => {
  return (
    <label htmlFor={`cb-inp-${value}`}>
      {label}
      <input
        type="checkbox"
        value={value}
        id={`cb-inp-${value}`}
        className="newsletter-group"
        defaultChecked={checked}
      />
    </label>
  )
}


const newsletterSubmit = () => {
  const endpoint =
      'https://api.io.italia.it/api/payportal/v1/newsletters/io/lists/6/recipients',
    token = '6LcBa7AaAAAAAEb8kvsHtZ_09Ctd2l0XqceFUHTe'

  const input = document.querySelector('.newsletter-email'),
    groups = [...document.querySelectorAll('.newsletter-group:checked')],
    emailValue = input.value.trim(),
    groupsValue = []

  groups.forEach(g => groupsValue.push(g.value))

  if (input.checkValidity()) {
    axios(endpoint, {
      method: 'post',
      url: endpoint,
      data: JSON.stringify({
        recaptchaToken: token,
        email: emailValue,
        groups: groupsValue
      })
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

const NewsletterBanner = () => {
  useEffect(() => {
    const submit = document.querySelector('.newslette-submit')
    submit.addEventListener('click', newsletterSubmit)
    return () => submit.removeEventListener('click', newsletterSubmit)
  }, [])

  return (
    <div>
      <section className="block --block-newsletter-banner newsletter-banner">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-12 col-md-5 offset-md-1 col-lg-5 offset-lg-1">
              <h3 className="newsletter-banner__title mb-md-0">
                Vuoi ricevere la<br />nostra Newsletter?
              </h3>
              <p>Segui le notizie per*:</p>

              <ul>
                {newsletterGroups.map((g, key) => {
                  const { label, value, checked } = g
                  return (
                    <li key={key}>
                      <Checkbox label={label} value={value} checked={checked} />
                    </li>
                  )
                })}
              </ul>
              <p>* campo obbligatorio, con possibilità di risposta multipla</p>
            </div>
            <div className="col-12 col-md-5 col-lg-5">
              <form onSubmit={e => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Inserisci la tua email"
                  className="newsletter-email"
                  required
                />
                <button className="cta --white newslette-submit" type="button">
                  <span>Iscriviti</span>
                </button>
                <p>
                  Inserendo il tuo indirizzo email stai accettando la nostra
                  informativa sul trattamento dei dati personali per la
                  newsletter.
                </p>
                <p>
                  Form protetto tramite reCAPTCHA e Google Privacy Policy e
                  Termini di servizio applicati.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default NewsletterBanner
