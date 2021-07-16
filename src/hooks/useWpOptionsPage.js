// import React from 'react'

import { useStaticQuery, graphql } from "gatsby"

export const useWpOptionsPage = () => {
  const { wp } = useStaticQuery(graphql`
    query optionsPage {
      wp(locales: { eq: "it" }) {
        options {
          globalData {
            companyData
            newsletter {
              checkboxesTitle
              fieldGroupName
              inputPlaceholder
              privacyText
              requiredFieldsNote
              sendButtonLabel
              title
            }
            socials {
              link {
                target
                title
                url
              }
              image {
                localFile {
                  extension
                  publicURL
                }
              }
              onfooter
              onheader
            }
          }
        }
      }
    }
  `)

  return wp.options.globalData
}
