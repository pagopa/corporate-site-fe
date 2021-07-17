import React from 'react'

import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'
import { ReactSVG } from 'react-svg'
import './Socials.sass'

const Socials = ({ header }) => {
  const { socials } = useWpOptionsPage()
  const collection = []

  socials.forEach(item => {
    if (header) {
      item.onheader && collection.push(item)
    } else {
      item.onfooter && collection.push(item)
    }
  })

  return (
    <>
      <ul className={`socials${header ? ' --in-header' : ''}`}>
        {collection.map((social, key) => {
          return (
            <li key={key}>
              <a
                href={social.link.url}
                target="_blank"
                title={social.link.title}
                rel="noreferrer noopener"
              >
                <ReactSVG
                  src={social.image.localFile.publicURL}
                  wrapper="span"
                />
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default Socials
