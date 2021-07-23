import React, { useContext } from 'react'

import Truncate from 'react-truncate'

import { useStaticQuery, graphql, Link } from 'gatsby'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'

import Cta from '../../components/Cta/Cta'

import './PressRelease.sass'
import { link } from 'joi';

const LatestPress = () => {
  const { translations } = useWpOptionsPage()
  const locale = useContext(LocaleContext)

  const data = useStaticQuery(graphql`
    query pressReleases {
      allWpPressReleases(limit: 2) {
        edges {
          node {
            title
            slug
            content
            locale {
              id
            }
            nodeType
          }
        }
      }
    }
  `),
  { edges: pressReleases } = data.allWpPressReleases

  const currentLocalePress = pressReleases.filter(j => j.node.locale.id === locale)

  return (
    <>
      {currentLocalePress.map((pr, key) => {
        const { title, slug, content, nodeType } = pr.node

        const text = content.replace(/(<([^>]+)>)/ig, '')
        
        return (
          <div className="col-12 col-lg-6">
            <article className="press-release" key={key}>
              <h4 className="--primary">{title}</h4>
              <Truncate lines={3}>
                {text}
              </Truncate>
              
              <Cta url={slug} label="Leggi" type={nodeType}/>
            </article>
          </div>
        )
      })}
    </>
  )
  
}

const PressRelease = ({ data }) => {

  const { title } = data
  return (
    <section className="block">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <h1>{title}</h1>
            <LatestPress />
          </div>
        </div>
      </div>
    </section>
  )
}

export default PressRelease
