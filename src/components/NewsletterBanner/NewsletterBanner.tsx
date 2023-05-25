import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Reaptcha from 'reaptcha';
import smoothscroll from 'smoothscroll-polyfill';

import './NewsletterBanner.sass';

const endpoint =
  'https://api.io.italia.it/api/payportal/v1/newsletters/io/lists/6/recipients';

const newsletterGroups = [
  {
    label: 'Cittadini',
    value: 47,
    checked: true,
  },
  {
    label: 'Pubbliche Amministrazioni',
    value: 48,
    checked: false,
  },
  {
    label: 'Aziende e Professionisti',
    value: 49,
    checked: false,
  },
  {
    label: 'Università e Centri di Ricerca',
    value: 50,
    checked: false,
  },
  {
    label: 'Giornalisti',
    value: 51,
    checked: false,
  },
];

const Checkbox = ({ label, value, checked, classes }: any) => {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        value={value}
        id={`cb-inp-${value}`}
        className="newsletter-group"
        defaultChecked={checked}
      />
      <label htmlFor={`cb-inp-${value}`}>{label}</label>
    </div>
  );
};

export const NewsletterBanner = () => {
  const [loading, setLoading] = useState(true);
  const [validity, setValidity] = useState(false);

  const checkValidity = (
    input: HTMLElementTagNameMap['select'],
    options: HTMLInputElement[]
  ) => {
    if (input.checkValidity() && options.find((el: any) => el.checked)) {
      setValidity(() => true);
    } else {
      setValidity(() => false);
    }
  };

  const reaptchaRef = useRef<Reaptcha>(null);

  useEffect(() => {
    const locationHash = window.location.hash;
    const newsletterAnchor = document.querySelector(
      '.newsletter-banner-anchor'
    );

    if (locationHash === '#newsletter') {
      smoothscroll.polyfill();

      setTimeout(() => {
        newsletterAnchor?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }

    const newsletterWrap: HTMLElementTagNameMap['div'] | null =
      document.querySelector('.newsletter-banner');

    if (newsletterWrap) {
      const newsletterInput: HTMLElementTagNameMap['select'] | null =
        newsletterWrap?.querySelector('.newsletter-email');

      const newsletterOptions: HTMLInputElement[] = [
        ...newsletterWrap?.querySelectorAll<HTMLElementTagNameMap['input']>(
          '.newsletter-group'
        ),
      ];

      if (newsletterInput && newsletterOptions) {
        newsletterInput &&
          newsletterOptions &&
          checkValidity(newsletterInput, newsletterOptions);

        newsletterInput?.addEventListener('keyup', () =>
          checkValidity(newsletterInput, newsletterOptions)
        );

        newsletterOptions.forEach(opt =>
          opt.addEventListener('change', () =>
            checkValidity(newsletterInput, newsletterOptions)
          )
        );

        return () => {
          newsletterInput.removeEventListener('keyup', checkValidity as any);
          newsletterOptions.forEach(opt =>
            opt.removeEventListener('change', checkValidity as any)
          );
        };
      }
    }
  }, []);

  const reaptchaVerify = () => {
    reaptchaRef.current?.execute();
    setLoading(true);
  };

  const newsletterReset = () => {
    reaptchaRef.current?.reset();
    setLoading(false);
  };

  const newsletterSubmit = async (recaptchaResponse: string) => {
    const newsletterWrap: HTMLElementTagNameMap['div'] | null =
      document.querySelector('.newsletter-banner');

    // newsletterSubmit = newsletterWrap.querySelector('.newsletter-submit');
    const input: HTMLInputElement | null | undefined =
      newsletterWrap?.querySelector('.newsletter-email');
    // optionsWrap = newsletterWrap.querySelector('.newsletter-banner__options');
    if (newsletterWrap) {
      const groups: HTMLInputElement[] = [
        ...newsletterWrap?.querySelectorAll<HTMLElementTagNameMap['input']>(
          '.newsletter-group:checked'
        ),
      ];

      const emailValue = input?.value?.trim();
      const groupsValue: string[] = groups.map(group => group.value);

      const data = {
        recaptchaToken: recaptchaResponse,
        email: emailValue,
        groups: groupsValue,
      };

      newsletterWrap?.classList.remove('is-success');
      newsletterWrap?.classList.remove('is-error');

      try {
        const response = await axios({
          method: 'post',
          url: endpoint,
          data: data,
        });
        response.status === 200 && newsletterWrap?.classList.add('is-success');
      } catch (e) {
        newsletterWrap?.classList.add('is-error');
      } finally {
        newsletterReset();
      }
    }
  };

  return (
    <>
      <div className="newsletter-banner-anchor"></div>
      <section className="block --block-newsletter-banner newsletter-banner">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1">
              <h3>
                Vuoi ricevere la
                <br />
                nostra Newsletter?
              </h3>
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
                {newsletterGroups.map(({ label, value, checked }, index) => (
                  <li key={index}>
                    <Checkbox label={label} value={value} checked={checked} />
                  </li>
                ))}
              </ul>
              <p className="--alternative --small">
                <em>
                  * campo obbligatorio, con possibilità di risposta multipla
                </em>
              </p>
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
                  className={`cta --white newsletter-submit${
                    loading ? ' is-loading' : ''
                  }`}
                  onClick={reaptchaVerify}
                  disabled={!validity}
                >
                  <span>Iscriviti</span>
                  <span className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>

                <Reaptcha
                  ref={reaptchaRef}
                  sitekey="6LcBa7AaAAAAAEb8kvsHtZ_09Ctd2l0XqceFUHTe"
                  size="invisible"
                  onVerify={newsletterSubmit}
                  onLoad={() => setLoading(false)}
                />
                <div>
                  <div className="message --success">
                    <span>
                      Richiesta inviata correttamente! A breve riceverai una
                      email per confermare la tua iscrizione.
                    </span>
                  </div>
                  <div className="message --error">
                    <span>
                      Si è verificato un problema, si prega di riprovare più
                      tardi.
                    </span>
                  </div>
                </div>
              </form>

              <div className="mt-5 mt-md-4">
                <p className="--alternative --small">
                  <em>
                    Inserendo il tuo indirizzo email stai accettando la{' '}
                    <a
                      href={'/it/privacy-policy/'}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      nostra informativa sul trattamento dei dati personali
                    </a>{' '}
                    per la newsletter.
                  </em>
                </p>
                <p className="--alternative --small">
                  <em>
                    Form protetto tramite reCAPTCHA e{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Privacy Policy
                    </a>{' '}
                    e{' '}
                    <a
                      href="https://policies.google.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Termini di servizio
                    </a>{' '}
                    applicati.
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
