import React from 'react'

import './Block.sass'

import Hero from 'components/Hero/Hero'
import Text from 'components/Text/Text'
import Intro from 'components/Intro/Intro'
import MapBox from 'components/MapBox/MapBox'
import Visual from 'components/Visual/Visual'
import CtaGrid from 'components/CtaGrid/CtaGrid'
import LogoLinks from 'components/LogoLinks/LogoLinks'
import CtaBanner from 'components/CtaBanner/CtaBanner'
import Accordion from 'components/Accordion/Accordion'
import BlocksList from 'components/BlocksList/BlocksList'
import VisualText from 'components/VisualText/VisualText'
import NewsEvents from 'components/NewsEvents/NewsEvents'
import JobsListing from 'components/JobsListing/JobsListing'
import UsefulLinks from 'components/UsefulLinks/UsefulLinks'
import PressRelease from 'components/PressRelease/PressRelease'
import ContactsList from 'components/ContactsList/ContactsList'
import AttachmentsGrid from 'components/AttachmentsGrid/AttachmentsGrid'
import MediaHighlights from 'components/MediaHighlights/MediaHighlights'
import ProjectsCarousel from 'components/ProjectsCarousel/ProjectsCarousel'
import UniversityAccordion from 'components/UniversityAccordion/UniversityAccordion'

const Block = ({ data, type, featuredImage, currentSlug }) => {
  return (
    <>
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_HeroSlider` && (
        <Hero data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockText` && <Text data={data} />}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockVisualText` && (
        <VisualText data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_UsefulLinks` && (
        <UsefulLinks data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_ProjectCarousel` && (
        <ProjectsCarousel data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockVisual` && (
        <Visual data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockIntro` && (
        <Intro
          data={data}
          featuredImage={featuredImage}
          currentSlug={currentSlug}
        />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockList` && (
        <BlocksList data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockBannerCta` && (
        <CtaBanner data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockCtaGrid` && (
        <CtaGrid data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockContactsList` && (
        <ContactsList data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockMapBox` && (
        <MapBox data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockLogoLinks` && (
        <LogoLinks data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockJobsListing` && (
        <JobsListing data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockPressRelease` && (
        <PressRelease data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockNewsEvents` && (
        <NewsEvents data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockMediaHighlights` && (
        <MediaHighlights data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockAttachmentsGrid` && (
        <AttachmentsGrid data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockAccordion` && (
        <Accordion data={data} />
      )}
      {data.fieldGroupName ===
        `${type}_Flexiblecontent_Body_Blocks_BlockUniversityAccordion` && (
        <UniversityAccordion data={data} />
      )}
    </>
  )
}

export default Block
