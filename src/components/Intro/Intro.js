import React, { useEffect } from 'react'

import parse from 'html-react-parser'
import smoothscroll from 'smoothscroll-polyfill';

import { useMenu } from '../../hooks/useMenu'

import BackgroundGraphics from '../BackgroundGraphics/BackgroundGraphics'
import Image from '../Image/Image'
import Cta from '../Cta/Cta'

import './Intro.sass'

const IntroMenu = ({ name, currentSlug }) => {
  const allMenus = useMenu()
  const introMenuItems = allMenus.filter(menu => menu.node.name === name)[0].node.menuItems

  return (
    <>
      <nav className="intro-menu">
        <ul>
          {introMenuItems.nodes.map((item, key) => {
            const itemSlug = (item.path.match(/[^/]+/g)).slice(-1)[0]
            return (
              <li key={key} className={itemSlug === currentSlug ? 'is-current' : ''}>
                <Cta label={item.label} url={item.url} variant="link-simple" />
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

const Intro = ({ data, featuredImage, currentSlug }) => {
  
  const {
    blockOptions: { backgroundGraphics },
    eyelet,
    title,
    text,
    image,
    usePostFeaturedImage,
    introMenu
  } = data

  // manage anchor list for accordion in page if present

  const handleAnchorClick = (e) => {
    e.preventDefault()
    const anchor = e.currentTarget.href
    console.log(anchor)
    const target = anchor.split('#')[1]
    window.location.hash = target
    scrollToAccordion(target)
  }

  const scrollToAccordion = (index) => {
    const accordions = [...document.querySelectorAll('.block-accordion')]
    accordions[index - 1]?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const anchors = document.querySelector('.accordion-anchors')?.querySelectorAll('a')
    if (anchors) smoothscroll.polyfill()

    const hash = window.location.hash.substring(1)
    if (hash) scrollToAccordion(hash)
    
    anchors?.forEach(a => a.addEventListener('click', handleAnchorClick, false))

    return () => anchors?.forEach(a => a.removeEventListener('click', handleAnchorClick))
  }, [])

  // select image to use if cover for cover

  const coverImage = usePostFeaturedImage
    ? featuredImage?.node
    : image
    ? image
    : false

  const ImageMarkup = () => {
    if (image) {
      return (
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <Image image={coverImage.localFile} title={coverImage.altText} />
          </div>
        </div>
      )
    } else {
      return <Image image={coverImage.localFile} title={coverImage.altText} />
    }
  }

  return (
    <section
      className={`block --block-intro intro${
        !coverImage && !text ? ' mb-0 --nocontent' : ''
      }`}
    >
      {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="intro__heading">
              {eyelet && <h4>{eyelet}</h4>}
              {introMenu && <IntroMenu name={introMenu} currentSlug={currentSlug} />}
              {title && <h1>{parse(title)}</h1>}
            </div>
          </div>
        </div>
        {coverImage && <ImageMarkup />}
        {text && (
          <div className={`row${image ? ' mt-5' : ''}`}>
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="wysiwyg">{parse(text)}</div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Intro
