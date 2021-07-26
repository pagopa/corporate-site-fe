import { useStaticQuery, graphql } from 'gatsby'

export const useWpOptionsPage = () => {
  const { wp } = useStaticQuery(graphql`
    query optionsPage {
      wp(locales: { eq: "it" }) {
        options {
          globalData {
            footer {
              linksAttachments {
                footerAttachment {
                  localFile {
                    publicURL
                  }
                  title
                }
                footerLink {
                  target
                  title
                  url
                }
              }
            }
            various {
              jobIframe
              onetrustSnippet
            }
            translations {
              stringKey
              itValue
              enValue
            }
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
