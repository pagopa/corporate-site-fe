import React, { useContext, useState, useEffect } from 'react'

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

let reaptchaInstance

const NewsletterBanner = () => {

  const { siteUrl } = useSiteMetadata()
  const locale = useContext(LocaleContext)

  const [loading, setLoading] = useState(false)
  const [validity, setValidity] = useState(false)


  const checkValidity = (input, options) => {
    const newsletterSubmit = document.querySelector('.newsletter-submit')
    if (input.checkValidity() && options.find(el => el.checked)) {
      // newsletterSubmit.removeAttribute('disabled')
      setValidity(() => true)
    } else {
      // newsletterSubmit.setAttribute('disabled', true)
      setValidity(() => false)
    }
  }

  useEffect(() => {
    const newsletterWrap = document.querySelector('.newsletter-banner'),
          newsletterInput = newsletterWrap.querySelector('.newsletter-email'),
          newsletterOptions = [...newsletterWrap.querySelectorAll('.newsletter-group')]
      
    checkValidity(newsletterInput, newsletterOptions)

    newsletterInput.addEventListener('keyup', () => checkValidity(newsletterInput, newsletterOptions))
    newsletterOptions.forEach(opt => opt.addEventListener('change', () => checkValidity(newsletterInput, newsletterOptions)))

    return () => {
      newsletterInput.removeEventListener('keyup', checkValidity)
      newsletterOptions.forEach(opt => opt.removeEventListener('change', checkValidity))
    }
  }, [])

  const endpoint =
        'https://api.io.italia.it/api/payportal/v1/newsletters/io/lists/6/recipients'

    

  const reaptchaVerify = () => {
    reaptchaInstance.execute()
    setLoading(() => true)
  }

  const newsletterReset = () => {
    // console.log('reset')
    reaptchaInstance?.reset()
    setLoading(() => false)
  }


  const newsletterSubmit = (recaptchaResponse) => {


    const newsletterWrap = document.querySelector('.newsletter-banner'),
          newsletterSubmit = newsletterWrap.querySelector('.newsletter-submit'),
          input = newsletterWrap.querySelector('.newsletter-email'),
          optionsWrap = newsletterWrap.querySelector('.newsletter-banner__options'),
          groups = [...newsletterWrap.querySelectorAll('.newsletter-group:checked')],
          emailValue = input.value.trim(),
          groupsValue = []
    
          
    groups.forEach(g => groupsValue.push(g.value))
          
    const data = {
      recaptchaToken: recaptchaResponse,
      email: emailValue,
      groups: groupsValue
    }

    newsletterWrap.classList.remove('is-success')
    newsletterWrap.classList.remove('is-error')

    axios({
      method: 'post',
      url: endpoint,
      data: data
    })
    .then(response => {
      newsletterWrap.classList.add('is-success')
    })
    .catch(error => {
      newsletterWrap.classList.add('is-error')
    })
    .then(() => {
      newsletterReset()
    })
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
                    className={`cta --white newsletter-submit${loading ? ' is-loading' : ''}`}
                    onClick={reaptchaVerify}
                    disabled={!validity}
                  >
                    <span>Iscriviti</span>
                    <span className="loader"><span></span><span></span><span></span><span></span></span>
                  </button>
                  
                  <Reaptcha
                    ref={e => reaptchaInstance = e}
                    sitekey="6LcBa7AaAAAAAEb8kvsHtZ_09Ctd2l0XqceFUHTe"
                    size="invisible"
                    onVerify={newsletterSubmit}
                  />
                  <div>
                    <div className="message --success">
                      <span>Iscrizione alla newsletter avvenuta con successo!</span>
                    </div>
                    <div className="message --error">
                      <span>Si è verificato un problema, si prega di riprovare più tardi.</span>
                    </div>
                  </div>
              </form>

              <div className="mt-5 mt-md-4">

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
