import { useTranslation } from 'gatsby-plugin-react-i18next';
import React, { useState, useRef } from 'react';
import SwiperCore, {
  A11y,
  Controller,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { Body } from '../../Remark/Body';
import { Video } from '../../Video';
import './HeroSlider.sass';

// Initialize Swiper modules once at module level
// Note: SwiperCore.use() is NOT a React Hook, it's a Swiper library method
// eslint-disable-next-line react-hooks/rules-of-hooks
SwiperCore.use([Navigation, Pagination, EffectFade, Controller, A11y]);

export const HeroSlider = ({
  heroSliderItems,
  slug,
  id,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_HERO_SLIDER_Fragment) => {
  const { t } = useTranslation();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideChange, setIsSlideChange] = useState<boolean>(false);
  const swiperRef = useRef<SwiperCore | null>(null);

  const handleSlideChange = (currentIndex: number) => {
    setIsSlideChange(true);
    setCurrentSlideIndex(currentIndex);
  };

  if (heroSliderItems?.length) {
    const swiperCommons = {
      speed: 480,
      spaceBetween: 0,
      slidesPerView: 1,
      loop: heroSliderItems.length > 1 ? true : false,
    };

    const { title, body, link, linkLabel } = heroSliderItems[0] || {};

    const hasVideo = heroSliderItems.some(item => item?.youtubeVideo);

    const isDecorative = !hasVideo;

    return (
      <section className="block hero" id={slug || id}>
        <div className="hero__background" />
        <div className="container-fluid">
          <div className="row d-flex align-items-center">
            <div className="col-12 col-lg-6 offset-lg-1">
              <div className="hero__content">
                {title && body && (
                  <>
                    <h1>{title}</h1>
                    <div className="wysiwyg">
                      <Body data={body} />
                    </div>
                    {link && (
                      <Cta
                        label={linkLabel || title}
                        href={link}
                        blank
                        variant="white"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div
                className="hero__image"
                aria-hidden={isDecorative ? 'true' : undefined}
              >
                <button
                  className="hero__nav hero__nav__prev"
                  aria-label={t('slider.prevSlide')}
                  tabIndex={isDecorative ? -1 : 0}
                />
                <button
                  className="hero__nav hero__nav__next"
                  aria-label={t('slider.nextSlide')}
                  tabIndex={isDecorative ? -1 : 0}
                />
                <div className="hero__pagination">
                  {heroSliderItems.length > 1 &&
                    heroSliderItems.map((_, index) => (
                      <button
                        key={index}
                        className={`bullet ${
                          currentSlideIndex === index ? 'is-current' : ''
                        }`}
                        aria-label={t('slider.paginationBulletMessage', {
                          index: index + 1,
                        })}
                        aria-current={
                          currentSlideIndex === index ? 'true' : undefined
                        }
                        onClick={() => swiperRef.current?.slideTo(index)}
                        tabIndex={isDecorative ? -1 : 0}
                      />
                    ))}
                </div>
                <Swiper
                  speed={swiperCommons.speed}
                  spaceBetween={swiperCommons.spaceBetween}
                  slidesPerView={swiperCommons.slidesPerView}
                  centeredSlides={true}
                  loop={swiperCommons.loop}
                  navigation={{
                    prevEl: '.hero__nav__prev',
                    nextEl: '.hero__nav__next',
                  }}
                  pagination={false}
                  a11y={
                    isDecorative
                      ? { enabled: false }
                      : {
                          enabled: true,
                          prevSlideMessage: t('slider.prevSlideMessage'),
                          nextSlideMessage: t('slider.nextSlideMessage'),
                          firstSlideMessage: t('slider.firstSlideMessage'),
                          lastSlideMessage: t('slider.lastSlideMessage'),
                          paginationBulletMessage: t(
                            'slider.paginationBulletMessage'
                          ),
                        }
                  }
                  onSlideChange={swiper => {
                    handleSlideChange(swiper.activeIndex);
                  }}
                  onSwiper={swiper => {
                    swiperRef.current = swiper;
                  }}
                >
                  {heroSliderItems.map((item, key) => {
                    const { image, youtubeVideo } = item || {};
                    return (
                      <SwiperSlide key={key}>
                        {youtubeVideo ? (
                          <Video
                            video={youtubeVideo}
                            image={(image as Queries.STRAPI__MEDIA) || null}
                            isSlideChange={isSlideChange}
                            currentSlideIndex={currentSlideIndex}
                          />
                        ) : (
                          image && (
                            <Image data={image as Queries.STRAPI__MEDIA} />
                          )
                        )}
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return <></>;
};
