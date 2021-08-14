import React from 'react'

import parse from 'html-react-parser'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import './Accordion.sass'

const AccordionComp = ({ data }) => {
  const { blockOptions, title, entries } = data

  // const hasEntries = entries.length ? true : false

  const { backgroundGraphics, blockPosition, blockWidth } = blockOptions

  const columns = {}

  if (blockPosition === 'center') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-2`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'left') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'right') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-3`
  }

  return (
    <>
      <section className="block --block-accordion block-accordion">
        <div className="container-fluid">
          <div className="row">
            <div className={`col-12 ${columns[blockWidth]}`}>
              <h1>{title}</h1>

              {entries && (
                <Accordion allowZeroExpanded>
                  {entries.map((e, key) => {
                    const { heading, content, attachments } = e.accordion
                    return (
                      <AccordionItem className="accordion-entry" key={key}>
                        <AccordionItemHeading className="accordion-entry__header">
                          <AccordionItemButton className="accordion-entry__button">
                            <h4 className="--primary">{heading}</h4>
                          </AccordionItemButton>
                        </AccordionItemHeading>

                        <AccordionItemPanel className="accordion-entry__content">
                          <div className="wysiwyg">
                            {parse(content)}
                            {attachments &&
                              attachments.map((a, key) => {
                                const { title, localFile } = a.file
                                return (
                                  <a
                                    href={localFile.publicURL}
                                    className="cta --link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    key={key}
                                  >
                                    <span>{title}</span>
                                  </a>
                                )
                              })}
                          </div>
                        </AccordionItemPanel>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default AccordionComp

// blockOptions {
//   blockPosition
//   blockWidth
//   fieldGroupName
//   backgroundGraphics {
//     fieldGroupName
//     size
//     xposition
//     yposition
//   }
// }
// title
// entries {
//   accordion {
//     heading
//     content
//     attachments {
//       file {
//         title
//         localFile {
//           publicURL
//         }
//       }
//     }
//   }
// }
