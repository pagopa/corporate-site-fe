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
import Accordion from './../Accordion/Accordion'
import BlocksList from './../BlocksList/BlocksList'
import VisualText from './../VisualText/VisualText'
import JobsListing from './../JobsListing/JobsListing'
import UsefulLinks from './../UsefulLinks/UsefulLinks'
import PressRelease from './../PressRelease/PressRelease'
import ContactsList from './../ContactsList/ContactsList'
import AttachmentsGrid from './../AttachmentsGrid/AttachmentsGrid'
import ProjectsCarousel from './../ProjectsCarousel/ProjectsCarousel'

const Block = ({ data, type, featuredImage }) => {

  return (
    <>
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_HeroSlider` && (
        <Hero data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockText` && (
        <Text data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockVisualText` && (
        <VisualText data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_UsefulLinks` && (
        <UsefulLinks data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_ProjectCarousel` && (
        <ProjectsCarousel data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockVisual` && (
        <Visual data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockIntro` && (
        <Intro data={data} featuredImage={featuredImage} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockList` && (
        <BlocksList data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockBannerCta` && (
        <CtaBanner data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockCtaGrid` && (
        <CtaGrid data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockContactsList` && (
        <ContactsList data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockMapBox` && (
        <MapBox data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockLogoLinks` && (
        <LogoLinks data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockJobsListing` && (
        <JobsListing data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockPressRelease` && (
        <PressRelease data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockAttachmentsGrid` && (
        <AttachmentsGrid data={data} />
      )}
      {data.fieldGroupName === `${type}_Flexiblecontent_Body_Blocks_BlockAccordion` && (
        <Accordion data={data} />
      )}
    </>
  )
}

export default Block
