import { useI18next } from 'gatsby-plugin-react-i18next';
import React, { useState } from 'react';
import ita from '../../images/it.png';
import eng from '../../images/en.png';

export const LanguageSwitch = () => {
  const { languages, changeLanguage, language } = useI18next();
  const [isOpen, setIsOpen] = useState(false);

  const handleChangeLanguage = (selectedLanguage: string) => {
    changeLanguage(selectedLanguage);
    window.location.assign(
      `/${selectedLanguage}${selectedLanguage === 'it' ? '/' : '/homepage/'}`
    );
    setIsOpen(false);
  };

  return (
    <div className="language-switch" style={{ border: '1px solid #E8EBF1' }}>
      <button
        className="current-language"
        style={{
          display: 'flex',
          alignItems: 'center',
          border: 'none',
          padding: '6px',
          height: '28px',
          width: '60px',
          justifyContent: language === 'en' ? 'space-between' : undefined,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={language === 'it' ? ita : eng}
          alt={language}
          style={{
            width: '20px',
            height: '20px',
            marginRight: '5px',
            verticalAlign: 'middle',
          }}
        />
        <span style={{ verticalAlign: 'middle' }}>
          {language.toUpperCase()}
        </span>
      </button>
      {isOpen && (
        <>
          <div
            style={{
              width: '80%',
              height: '1px',
              margin: '3px auto',
              border: 'none',
              borderBottom: '1px solid #E8EBF1',
            }}
          />
          <ul
            className="language-list"
            style={{ padding: 0, listStyle: 'none', margin: 0 }}
          >
            {languages.map((lng, index) => (
              <>
                {lng !== language && (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent:
                        lng === 'en' ? 'space-between' : undefined,
                      padding: '6px',
                      height: '28px',
                      width: '60px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleChangeLanguage(lng)}
                  >
                    <img
                      src={lng === 'it' ? ita : eng}
                      alt={lng}
                      style={{
                        width: '20px',
                        height: '20px',
                        marginRight: '5px',
                        verticalAlign: 'middle',
                      }}
                    />
                    <span style={{ verticalAlign: 'middle' }}>
                      {lng.toUpperCase()}
                    </span>
                  </li>
                )}
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
