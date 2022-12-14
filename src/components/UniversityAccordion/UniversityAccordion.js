import React, { useState, useEffect } from 'react'

import ReactPaginate from 'react-paginate'

import parse from 'html-react-parser'

import { useUniversityCollaborations } from 'hooks/useUniversityCollaborations'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import 'components/Pagination/Pagination.sass'
import 'components/Accordion/Accordion.sass'
import 'components/UniversityAccordion/UniversityAccordion.sass'

const AccordionItemComp = ({ data }) => {
  const { title, content, collaborationFields } = data
  const { collaborationType, isActive } = collaborationFields
  return (
    <AccordionItem className="accordion-entry">
      <AccordionItemHeading className="accordion-entry__header">
        <AccordionItemButton className="accordion-entry__button">
          <h3>{parse(title)}</h3>
          <h4
            className="--primary"
            data-status={isActive ? 'in corso' : 'conclusa'}
          >
            {collaborationType}
          </h4>
        </AccordionItemButton>
      </AccordionItemHeading>

      <AccordionItemPanel className="accordion-entry__content">
        <div className="wysiwyg">{content && parse(content)}</div>
      </AccordionItemPanel>
    </AccordionItem>
  )
}

const EntriesList = ({ entries }) => {
  return (
    <>
      {entries && (
        <Accordion allowZeroExpanded className="accordion --university">
          {entries.map((e, key) => {
            return <AccordionItemComp data={e.node} key={key} />
          })}
        </Accordion>
      )}
    </>
  )
}

const PaginatedEntriesList = ({ entries, itemsPerPage = 4 }) => {
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(entries.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(entries.length / itemsPerPage))
  }, [itemOffset, itemsPerPage])

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % entries.length
    setItemOffset(newOffset)
  }

  return (
    <>
      {currentItems && (
        <Accordion allowZeroExpanded className="accordion --university">
          {currentItems.map((e, key) => {
            return <AccordionItemComp data={e.node} key={key} />
          })}
          <ReactPaginate
            nextLabel="Avanti"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="Precedente"
            pageClassName="pagination__page"
            pageLinkClassName="page-link"
            previousClassName=""
            previousLinkClassName="pagination__nav --prev"
            nextClassName=""
            nextLinkClassName="pagination__nav --next"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination --reactpaginate"
            activeClassName="is-current"
            renderOnZeroPageCount={null}
          />
        </Accordion>
      )}
    </>
  )
}

const UniAccordionComp = ({ data }) => {
  const { title, pagination } = data

  const collaborations = useUniversityCollaborations()

  const orderedEntries = [
    ...collaborations.filter(i => i.node.collaborationFields.isActive),
    ...collaborations.filter(i => !i.node.collaborationFields.isActive),
  ]

  return (
    <>
      <section className="block --block-universityaccordion block-universityaccordion">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <h4>{title}</h4>

              {!pagination && <EntriesList entries={orderedEntries} />}
              {pagination && <PaginatedEntriesList entries={orderedEntries} />}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UniAccordionComp
