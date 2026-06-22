import type { ReactElement } from 'react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import './ProjectsCarousel.sass';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';

export const ProjectsCarousel = ({
  title,
  projects,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_PROJECTS_CAROUSEL_Fragment): ReactElement => {
  const swiperCommons = {
    speed: 480,
    spaceBetween: 16,
    slidesPerView: 1.1,
    loop: true,
  };

  const { language } = useI18next();
  const { t } = useTranslation();

  return (
    <section
      className="block block-project-carousel projects-carousel"
      aria-labelledby="carousel-heading"
      aria-roledescription="carousel"
    >
      <div className="projects-carousel__grid-container">
        <div className="projects-carousel__grid-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-11 offset-md-1 d-flex align-items-center justify-content-center">
                <header className="projects-carousel__header">
                  {/* Fake buttons for layout. */}
                  <div
                    className="projects-carousel__nav prev"
                    aria-hidden="true"
                    style={{ visibility: 'hidden' }}
                  />

                  {title && <h2 id="carousel-heading">{title}</h2>}

                  <div
                    className="projects-carousel__nav next"
                    aria-hidden="true"
                    style={{ visibility: 'hidden' }}
                  />
                </header>
              </div>
            </div>
          </div>
        </div>

        <div className="projects-carousel__grid-slider">
          <div className="container-fluid">
            <div className="row d-flex align-items-center">
              <div className="col-12">
                <div className="projects-carousel__content">
                  <Swiper
                    id="swiper-wrapper-1"
                    speed={swiperCommons.speed}
                    spaceBetween={swiperCommons.spaceBetween}
                    slidesPerView={swiperCommons.slidesPerView}
                    breakpoints={{
                      992: {
                        slidesPerView: 1.63,
                        spaceBetween: 40,
                      },
                      1200: {
                        slidesPerView: 2,
                        spaceBetween: 60,
                      },
                    }}
                    navigation={{
                      prevEl: '.projects-carousel__nav.prev',
                      nextEl: '.projects-carousel__nav.next',
                    }}
                    a11y={{
                      enabled: true,
                      prevSlideMessage:
                        t('slider.prevSlideMessage') ?? undefined,
                      nextSlideMessage:
                        t('slider.nextSlideMessage') ?? undefined,
                      slideRole: '',
                      slideLabelMessage: '',
                    }}
                  >
                    {projects?.map((item, key) => {
                      const {
                        carouselAbstract,
                        carouselCtaLabel,
                        carouselImage,
                        carouselTitle,
                        featuredImage,
                        slug,
                      } = item || {};

                      return (
                        <SwiperSlide
                          key={key}
                          tag="article"
                          className="projects-carousel__item"
                          aria-roledescription="slide"
                          aria-labelledby={`slide-title-${key}`}
                          aria-describedby={`slide-position-${key}`}
                        >
                          <span
                            id={`slide-position-${key}`}
                            className="sr-only"
                          >
                            {`${key + 1} ${language === 'it' ? 'di' : 'of'}
                            ${projects?.length || 0}`}
                          </span>

                          <div>
                            <h3 id={`slide-title-${key}`}>{carouselTitle}</h3>
                            {(featuredImage || carouselImage) && (
                              <Image
                                data={
                                  (carouselImage ||
                                    featuredImage) as Queries.STRAPI__MEDIA
                                }
                              />
                            )}
                          </div>
                          <div className="project-carousel__item__cta">
                            {carouselAbstract && (
                              <div className="wysiwyg">
                                <p>{carouselAbstract}</p>
                              </div>
                            )}
                            {carouselCtaLabel && (
                              <Cta
                                label={carouselCtaLabel}
                                title={carouselTitle ?? undefined}
                                href={`/${language}/${
                                  t('productsAndServices') ?? ''
                                }/${slug}`}
                                variant="white-hollow"
                              />
                            )}
                          </div>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="projects-carousel__grid-controls">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-11 offset-md-1 d-flex align-items-center justify-content-center">
                <div className="projects-carousel__header" aria-hidden="true">
                  <button
                    className="projects-carousel__nav prev"
                    aria-label={t('slider.prevSlideMessage') ?? undefined}
                    aria-controls="swiper-wrapper-1"
                  />

                  {/* Fake title for layout */}
                  {title && <h2 style={{ visibility: 'hidden' }}>{title}</h2>}

                  <button
                    className="projects-carousel__nav next"
                    aria-label={t('slider.nextSlideMessage') ?? undefined}
                    aria-controls="swiper-wrapper-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
