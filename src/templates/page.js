import React from 'react'

import { graphql } from 'gatsby'
import Layout from '../partials/Layout'

const Page = ({ data, intl }) => {
  const { wpPage: page } = data

  return (
    <Layout>
      <h2>
        {page.title}
      </h2>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </Layout>
  )
}


export default injectIntl(Page)

export const pageQuery = graphql`
  query PageById($id: String!) {
    wpPage(id: {eq: $id}) {
      id
      title
      content
    }
  }
`