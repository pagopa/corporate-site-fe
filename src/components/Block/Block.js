import React from 'react'

import './Block.sass'

import Hero from './../Hero/Hero'
import Text from './../Text/Text'
import Intro from './../Intro/Intro'
import MapBox from './../MapBox/MapBox'
import Visual from './../Visual/Visual'
import CtaGrid from './../CtaGrid/CtaGrid'
import CtaBanner from './../CtaBanner/CtaBanner'
import BlocksList from './../BlocksList/BlocksList'
import VisualText from './../VisualText/VisualText'
import UsefulLinks from './../UsefulLinks/UsefulLinks'
import ContactsList from './../ContactsList/ContactsList'
import ProjectsCarousel from './../ProjectsCarousel/ProjectsCarousel'



const Block = ({ data, locale }) => {
  return (
    <>
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_HeroSlider" && (
        <Hero data={data} locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockText" && (
        <Text data={data} classes="block-text" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockVisualText" && (
        <VisualText data={data} classes="block-visual-text" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_UsefulLinks" && (
        <UsefulLinks data={data} classes="block-useful-links" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_ProjectCarousel" && (
        <ProjectsCarousel data={data} classes="block-project-carousel" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockVisual" && (
        <Visual data={data} classes="block-visual" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockIntro" && (
        <Intro data={data} classes="block-intro" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockList" && (
        <BlocksList data={data} classes="block-blocks-list" locale={locale} />
      )}  
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockBannerCta" && (
        <CtaBanner data={data} classes="block-cta-banner" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockCtaGrid" && (
        <CtaGrid data={data} classes="block-cta-grid" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockContactsList" && (
        <ContactsList data={data} classes="block-contacts-list" locale={locale} />
      )}
      {data.fieldGroupName === "Page_Flexiblecontent_Body_Blocks_BlockMapBox" && (
        <MapBox data={data} classes="block-map-box" locale={locale} />
      )}
    </>
  )
}

export default Block