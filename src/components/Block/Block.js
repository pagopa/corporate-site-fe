import React from 'react'

import './Block.sass'

import Hero from './../Hero/Hero'
import Text from './../Text/Text'
import Intro from './../Intro/Intro'
import MapBox from './../MapBox/MapBox'
import Visual from './../Visual/Visual'
import CtaGrid from './../CtaGrid/CtaGrid'
import LogoLinks from './../LogoLinks/LogoLinks'
import CtaBanner from './../CtaBanner/CtaBanner'
import BlocksList from './../BlocksList/BlocksList'
import VisualText from './../VisualText/VisualText'
import JobsListing from './../JobsListing/JobsListing'
import UsefulLinks from './../UsefulLinks/UsefulLinks'
import ContactsList from './../ContactsList/ContactsList'
import ProjectsCarousel from './../ProjectsCarousel/ProjectsCarousel'

const Block = ({ data, type, featuredImage, title }) => {

  return (
    <>
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_HeroSlider` && (
        <Hero data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockText` && (
        <Text data={data} classes="block-text" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockVisualText` && (
        <VisualText data={data} classes="block-visual-text" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_UsefulLinks` && (
        <UsefulLinks data={data} classes="block-useful-links" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_ProjectCarousel` && (
        <ProjectsCarousel data={data} classes="block-project-carousel" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockVisual` && (
        <Visual data={data} classes="block-visual" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockIntro` && (
        <Intro data={data} classes="block-intro" featuredImage={featuredImage} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockList` && (
        <BlocksList data={data} classes="block-blocks-list" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockBannerCta` && (
        <CtaBanner data={data} classes="block-cta-banner" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockCtaGrid` && (
        <CtaGrid data={data} classes="block-cta-grid" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockContactsList` && (
        <ContactsList data={data} classes="block-contacts-list" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockMapBox` && (
        <MapBox data={data} classes="block-map-box" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockLogoLinks` && (
        <LogoLinks data={data} classes="block-logo-links" />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockJobsListing` && (
        <JobsListing data={data} classes="block-jobs-listing" />
      )}
    </>
  )
}

export default Block
