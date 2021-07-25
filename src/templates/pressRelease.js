import React from 'react'

import { graphql } from 'gatsby'

import Layout from '../partials/Layout'


const pressReleasePage = ({ data }) => {
  const { title, slug, locale, content } = data.wpPressReleases

  const currentLocale = locale.id,
    currentSlug = slug

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      <article className="job">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </article>
    </Layout>
  )
}
export default pressReleasePage

export const pressReleaseQuery = graphql`
  query pressRelease($id: String!) {
    wpPressReleases(id: { eq: $id }) {
      id
      date
      title
      slug
      content
      locale {
        id
      }
      nodeType
    }
  }
`
