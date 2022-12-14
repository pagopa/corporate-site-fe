import React, { useState } from 'react'

import parse from 'html-react-parser'

import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Controller,
} from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/effect-fade/effect-fade.min.css'

import Cta from 'components/Cta/Cta'
import Image from 'components/Image/Image'

import './Hero.sass'

SwiperCore.use([Navigation, Pagination, EffectFade, Controller])

const Hero = ({ data }) => {
  const [contentSwiper, setContentSwiper] = useState(null)

  const { items } = data

  const swiperCommons = {
    speed: 480,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: items.length > 1 ? true : false,
  }

  return (
    <section className="block --hero hero">
      <div className="hero__background" />
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-12 col-lg-6 offset-lg-1">
            <div className="hero__content">
              {items.length && (
                <>
                  <article>
                    <h1>{parse(items[0].content.title)}</h1>
                    <div className="wysiwyg">
                      {parse(items[0].content.text)}
                    </div>
                    {items[0].content.link && (
                      <Cta
                        label={items[0].content.link.title}
                        url={items[0].content.link.url}
                        blank={items[0].content.link.target}
                        variant="white"
                      />
                    )}
                  </article>
                </>
              )}

              {/* <Swiper
                speed={swiperCommons.speed}
                spaceBetween={swiperCommons.spaceBetween}
                slidesPerView={swiperCommons.slidesPerView}
                loop={swiperCommons.loop}
                allowTouchMove={false}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                onSwiper={setContentSwiper}
              >
                {items.map(({ content }, key) => {
                  const { title, text, link } = content
                  return (
                    <SwiperSlide key={key}>
                      <article>
                        <h1>{parse(title)}</h1>
                        <div className="wysiwyg">{parse(text)}</div>
                        {link && (
                          <Cta
                            label={link.title}
                            url={link.url}
                            blank={link.target}
                            variant="white"
                          />
                        )}
                      </article>
                    </SwiperSlide>
                  )
                })}
              </Swiper> */}
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="hero__image">
              <button
                className="hero__nav --prev"
                title="prev"
                aria-labelledby="prev"
              />
              <button
                className="hero__nav --next"
                title="next"
                aria-labelledby="next"
              />
              <div className="hero__pagination"></div>
              <Swiper
                speed={swiperCommons.speed}
                spaceBetween={swiperCommons.spaceBetween}
                slidesPerView={swiperCommons.slidesPerView}
                centeredSlides={true}
                loop={swiperCommons.loop}
                navigation={{
                  prevEl: '.hero__nav.--prev',
                  nextEl: '.hero__nav.--next',
                }}
                pagination={
                  items.length > 1
                    ? {
                        clickable: true,
                        el: '.hero__pagination',
                        bulletClass: 'bullet',
                        bulletActiveClass: 'is-current',
                        type: 'bullets',
                      }
                    : false
                }
                controller={{
                  control: contentSwiper,
                }}
              >
                {items.map(({ image }, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <figure>
                        <Image image={image.localFile} title={image.altText} />
                      </figure>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
