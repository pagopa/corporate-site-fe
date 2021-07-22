import React, { useContext } from 'react'

import { useStaticQuery, graphql, Link } from 'gatsby'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'

import './PressRelease.sass'

const LatestPress = () => {
  const data = useStaticQuery(graphql`
    query pressReleases {
      allWpPressReleases(limit: 2) {
        edges {
          node {
            title
            slug
            content
          }
        }
      }
    }
  `),
  { edges: pressReleases } = data.allWpPressReleases
  
}

const PressRelease = ({ data }) => {
  const { translations } = useWpOptionsPage()
  const locale = useContext(LocaleContext)

  const { title } = data
  return (
    <section className="block">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PressRelease
