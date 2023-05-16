import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { useLocalizedQuery } from '../../../hooks';
import { Pagination } from '../../Pagination/Pagination';
import '../../Pagination/Pagination.sass';
import { Body } from '../../Remark/Body';
import './Accordion.sass';
import './UniversityCollaborationList.sass';

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
        {body && <Body data={body} />}
      </AccordionItemPanel>
    </AccordionItem>
  );
};

const PaginatedEntriesList = ({
  collaborations,
}: {
  collaborations: Queries.UniversityCollaborationFragment[];
}) => {
  return (
    <Pagination
      keyExtractor={item => item.id}
      data={collaborations}
      renderItem={(item: Queries.UniversityCollaborationFragment) => (
        <Accordion allowZeroExpanded className="accordion --university">
          <UniversityCollaborationItem data={item} />
        </Accordion>
      )}
    />
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
      id
      body {
        data {
          childMarkdownRemark {
            html
          }
          id
        }
      }
      locale
      collaborationTypeTitle
      isActive
    }
    query allUniversityCollaboration {
      allStrapiUniversityCollaboration(sort: { publishedAt: DESC }) {
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
    <section className="block --block-universityaccordion block-universityaccordion my-4">
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
