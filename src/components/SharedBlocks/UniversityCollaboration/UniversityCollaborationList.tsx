import React, { useEffect, useState } from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import './UniversityCollaborationList.sass';
import './Accordion.sass';
import './Pagination.sass';
import ReactPaginate from 'react-paginate';
import { Body } from '../../Remark/Body';
import { useLocalizedQuery } from '../../../hooks';

const UniversityCollaborationItem = ({
  data,
}: {
  data: Queries.UniversityCollaborationFragment;
}) => {
  const { title, body, isActive, collaborationTypeTitle } = data || {};
  return (
    <AccordionItem className="accordion-entry">
      <AccordionItemHeading className="accordion-entry__header">
        <AccordionItemButton className="accordion-entry__button">
          <h3>{title}</h3>
          <h4
            className="--primary"
            data-status={isActive ? 'in corso' : 'conclusa'}
          >
            {collaborationTypeTitle}
          </h4>
        </AccordionItemButton>
      </AccordionItemHeading>

      <AccordionItemPanel className="accordion-entry__content">
        <Body data={body} />
      </AccordionItemPanel>
    </AccordionItem>
  );
};

const PaginatedEntriesList = ({
  collaborations,
  itemsPerPage = 4,
}: {
  collaborations: Queries.UniversityCollaborationFragment[];
  itemsPerPage?: number;
}) => {
  const [currentItems, setCurrentItems] = useState<
    Queries.UniversityCollaborationFragment[] | null
  >(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemOffset, setItemOffset] = useState<number>(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(collaborations.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(collaborations.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % collaborations.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems && (
        <Accordion allowZeroExpanded className="accordion --university">
          {currentItems.map((collaboration, key) => {
            return (
              <UniversityCollaborationItem data={collaboration} key={key} />
            );
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
          />
        </Accordion>
      )}
    </>
  );
};

const EntriesList = ({
  collaborations,
}: {
  collaborations: Queries.UniversityCollaborationFragment[];
}) => {
  return (
    <>
      {collaborations && (
        <Accordion allowZeroExpanded className="accordion --university">
          {collaborations.map((collaboration, key) => {
            return (
              <UniversityCollaborationItem data={collaboration} key={key} />
            );
          })}
        </Accordion>
      )}
    </>
  );
};

export const UniversityCollaborationList = ({
  title,
  pagination,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_UNIVERSITY_ACCORDION_Fragment) => {
  const query = useStaticQuery(graphql`
    fragment UniversityCollaboration on STRAPI_UNIVERSITY_COLLABORATION {
      title
      body {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      locale
      collaborationTypeTitle
      isActive
    }
    query allUniversityCollaboration {
      allStrapiUniversityCollaboration {
        nodes {
          ...UniversityCollaboration
        }
      }
    }
  `);

  const { localeNodes: collaborations } = useLocalizedQuery<
    Queries.UniversityCollaborationFragment,
    Queries.allUniversityCollaborationQuery
  >({
    query,
    type: 'allStrapiUniversityCollaboration',
  });

  const orderedEntries = collaborations.sort(collaboration =>
    collaboration.isActive ? -1 : 1
  );

  return (
    <section className="block --block-universityaccordion block-universityaccordion">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <h4>{title}</h4>

            {!pagination && <EntriesList collaborations={orderedEntries} />}
            {pagination && (
              <PaginatedEntriesList collaborations={orderedEntries} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
