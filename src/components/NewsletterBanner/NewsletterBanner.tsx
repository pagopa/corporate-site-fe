import React, { useRef, useState } from 'react';
import Reaptcha from 'reaptcha';

import './NewsletterBanner.sass';

import { useTranslation, Trans } from 'gatsby-plugin-react-i18next';

const endpoint =
  'https://api.io.italia.it/api/payportal/v1/newsletters/io/lists/6/recipients';

type NewsletterGroup = {
  label: string;
  value: number;
  checked: boolean;
};

const initialNewsletterGroups: NewsletterGroup[] = [
  {
    label: 'citizens',
    value: 47,
    checked: true,
  },
  {
    label: 'publicAdministrations',
    value: 48,
    checked: false,
  },
  {
    label: 'businesses',
    value: 49,
    checked: false,
  },
  {
    label: 'universities',
    value: 50,
    checked: false,
  },
  {
    label: 'journalists',
    value: 51,
    checked: false,
  },
];

type CheckboxProps = {
  label: string;
  value: number;
  checked: boolean;
  onChange: (value: number, checked: boolean) => void;
};

const Checkbox = ({ label, value, checked, onChange }: CheckboxProps) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(value, e.target.checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      onChange(value, !checked);
    }
  };

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        value={value}
        id={`cb-inp-${value}`}
        className="newsletter-group"
        checked={checked}
        onChange={handleChange}
        tabIndex={-1}
      />
      <label htmlFor={`cb-inp-${value}`} tabIndex={0} onKeyDown={handleKeyDown}>
        {t(`newsletter.groups.${label}`)}
      </label>
    </div>
  );
};

export const NewsletterBanner = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [groups, setGroups] = useState<NewsletterGroup[]>(
    initialNewsletterGroups
  );
  const [validity, setValidity] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isAtLeastOneChecked, setIsAtLeastOneChecked] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const reaptchaRef = useRef<Reaptcha>(null);

  const { t } = useTranslation();

  const handleCheckboxChange = (value: number, checked: boolean) => {
    const newGroups = groups.map(group =>
      group.value === value ? { ...group, checked } : group
    );
    setGroups(newGroups);
    checkValidity(email, newGroups);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    checkValidity(newEmail, groups);
  };

  const checkValidity = (
    currentEmail: string,
    currentGroups: NewsletterGroup[]
  ) => {
    const emailValid =
      currentEmail.trim() !== '' && /\S+@\S+\.\S+/.test(currentEmail);
    const atLeastOneChecked = currentGroups.some(group => group.checked);
    const isValid = emailValid && atLeastOneChecked;

    setIsEmailValid(emailValid);
    setIsAtLeastOneChecked(atLeastOneChecked);
    setValidity(isValid);

    if (!isValid) {
      if (!emailValid && !atLeastOneChecked) {
        setValidationError(t('newsletter.validationErrors.bothRequired'));
      } else if (!emailValid) {
        setValidationError(t('newsletter.validationErrors.emailRequired'));
      } else if (!atLeastOneChecked) {
        setValidationError(t('newsletter.validationErrors.groupsRequired'));
      }
    } else {
      setValidationError(null);
    }
  };

  const reaptchaVerify = () => {
    reaptchaRef.current?.execute();
    setLoading(true);
  };

  const newsletterReset = () => {
    reaptchaRef.current?.reset();
    setLoading(false);
    setSubmitStatus('idle');
  };

  const newsletterSubmit = async (recaptchaResponse: string) => {
    const emailValue = email.trim();
    const groupsValue: string[] = groups
      .filter(group => group.checked)
      .map(group => group.value.toString());

    const data = {
      recaptchaToken: recaptchaResponse,
      email: emailValue,
      groups: groupsValue,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        setSubmitStatus('success');
      }
    } catch (e) {
      console.log(e);
      setSubmitStatus('error');
    } finally {
      newsletterReset();
    }
  };

  return (
    <>
      <div id="newsletter" className="newsletter-banner-anchor"></div>
      <section
        className={`block block-newsletter-banner newsletter-banner ${
          submitStatus === 'success' ? 'is-success' : ''
        } ${submitStatus === 'error' || validationError ? 'is-error' : ''}`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1">
              <h3>
                <Trans i18nKey="newsletter.title" components={{ 1: <br /> }} />
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1">
              <p className="alternative small">
                <em>{t('newsletter.requiredField')}</em>
              </p>
              <p className="mb-3" aria-hidden="true">
                {t('newsletter.followNews')}
              </p>
            </div>
          </div>

          <form onSubmit={e => e.preventDefault()}>
            <div className="row">
              <div className="col-12 col-md-6 col-lg-5 offset-lg-1">
                <fieldset className="newsletter-banner__fieldset">
                  <legend className="newsletter-banner__legend">
                    {t('newsletter.followNews')}
                  </legend>
                  <ul
                    className="newsletter-banner__options"
                    aria-describedby={
                      validationError && !isAtLeastOneChecked
                        ? 'newsletter-validation-error'
                        : undefined
                    }
                  >
                    {groups.map(({ label, value, checked }) => (
                      <li key={value}>
                        <Checkbox
                          label={label}
                          value={value}
                          checked={checked}
                          onChange={handleCheckboxChange}
                        />
                      </li>
                    ))}
                  </ul>
                </fieldset>
              </div>

              <div className="col-12 col-md-6 col-lg-5">
                <label
                  htmlFor="email"
                  className="newsletter-banner__email-label"
                >
                  {t('newsletter.emailLabel')}
                </label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder={t('newsletter.emailPlaceholder')}
                  className="input newsletter-email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  aria-describedby={
                    validationError ? 'newsletter-validation-error' : undefined
                  }
                  aria-invalid={
                    validationError && !isEmailValid ? 'true' : 'false'
                  }
                />

                {validationError && (
                  <div
                    id="newsletter-validation-error"
                    className="message error"
                    role="alert"
                    style={{ marginTop: '2rem' }}
                  >
                    <span>{validationError}</span>
                  </div>
                )}

                <button
                  className={`cta cta--white newsletter-submit${
                    loading ? ' is-loading' : ''
                  }`}
                  onClick={reaptchaVerify}
                  disabled={!validity}
                  aria-describedby={
                    submitStatus === 'error'
                      ? 'newsletter-submit-error'
                      : undefined
                  }
                >
                  <span>{t('newsletter.subscribeButton')}</span>
                  <span className="loader">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </button>

                <div>
                  {submitStatus === 'success' && (
                    <div
                      id="newsletter-success-message"
                      className="message success"
                      role="status"
                      aria-live="polite"
                      aria-atomic="true"
                    >
                      <span>{t('newsletter.successMessage')}</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div
                      id="newsletter-submit-error"
                      className="message error"
                      role="alert"
                      aria-atomic="true"
                    >
                      <span>{t('newsletter.errorMessage')}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 mt-md-4">
                  <p className="alternative small">
                    <em>
                      <Trans
                        i18nKey="newsletter.privacyNotice"
                        components={{
                          1: (
                            <a
                              href="/it/privacy-policy/"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                        }}
                      />
                    </em>
                  </p>
                  <p className="alternative small">
                    <em>
                      <Trans
                        i18nKey="newsletter.recaptchaNotice"
                        components={{
                          1: (
                            <a
                              href="https://policies.google.com/privacy"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                          2: (
                            <a
                              href="https://policies.google.com/terms"
                              target="_blank"
                              rel="noopener noreferrer"
                            />
                          ),
                        }}
                      />
                    </em>
                  </p>
                </div>

                <Reaptcha
                  id="google-reaptcha-id"
                  ref={reaptchaRef}
                  sitekey="6LcBa7AaAAAAAEb8kvsHtZ_09Ctd2l0XqceFUHTe"
                  size="invisible"
                  onVerify={newsletterSubmit}
                  onLoad={() => setLoading(false)}
                />
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
