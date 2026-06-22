import React, { useState } from 'react';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Body } from '../../Remark/Body';
import chevronDownBrand from '../../../images/ui/chevron-down-brand.svg';
import { useTranslation } from 'gatsby-plugin-react-i18next';

type IntroMenuProps = {
  menu: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INTRO_Fragment['introMenu'];
  pathname: string;
};

const IntroMenu = ({ menu, pathname }: IntroMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  if (!menu?.length) return <></>;

  const urlSlug = pathname.replace(/\/+$/, '').split('/').pop();
  const items = menu
    .filter(item => !!item?.link)
    .map(item => {
      const { link, title, linkLabel } = item!;
      const slug = link!.replace(/\/+$/, '').split('/').pop();
      return {
        link: link!,
        label: linkLabel || title,
        isCurrent: urlSlug === slug,
      };
    });

  const inactiveItems = items.filter(item => !item.isCurrent);

  return (
    <nav className={classNames('intro-menu', isOpen && 'is-open')}>
      <ul className="intro-menu__list">
        {items.map(({ link, label, isCurrent }, key) => (
          <li key={key} className={classNames(isCurrent && 'is-current')}>
            {label && <Cta label={label} href={link} variant="link-simple" />}
          </li>
        ))}
        <li className="intro-menu__toggle-item">
          <button
            className="intro-menu__toggle"
            onClick={() => setIsOpen(o => !o)}
            aria-expanded={isOpen}
            aria-controls="intro-menu-dropdown"
            aria-label={t('introMenu.label')}
          >
            <img src={chevronDownBrand} alt="" aria-hidden="true" />
          </button>
        </li>
      </ul>
      {inactiveItems.length > 0 && (
        <ul id="intro-menu-dropdown" className="intro-menu__dropdown">
          {inactiveItems.map(({ link, label }, key) => (
            <li key={key}>
              {label && <Cta label={label} href={link} variant="link-simple" />}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export const Intro = ({
  eyelet,
  title,
  image,
  introMenu,
  body,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INTRO_Fragment) => {
  const { pathname } = useLocation();

  function renderEyelet() {
    if (!eyelet) return null;
    if (title) return <p className="h4">{eyelet}</p>;
    return <h1 className="h4">{eyelet}</h1>;
  }

  return (
    <section
      className={classNames('block block-intro intro', 'mb-0 nocontent')}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div
              className={
                title || introMenu?.length ? 'intro__heading' : 'intro'
              }
            >
              {renderEyelet()}
              {introMenu && <IntroMenu menu={introMenu} pathname={pathname} />}
              {title && <h1 className="h1">{title}</h1>}
            </div>
          </div>
        </div>
        {image && image?.localFile && (
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 d-flex align-items-center justify-content-center">
              {image && <Image data={image as Queries.STRAPI__MEDIA} />}
            </div>
          </div>
        )}
        {body && (
          <div>
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <Body data={body} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
