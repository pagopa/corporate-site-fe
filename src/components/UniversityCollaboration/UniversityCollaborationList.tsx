import React from 'react';

import { graphql, useStaticQuery } from 'gatsby';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { useLocalizedQuery } from '../../hooks';
import { SharedBlockBody } from '../SharedBlock/SharedBlockBody';

import './UniversityCollaborationList.sass';
import './Accordion.sass';

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
        <SharedBlockBody data={body as Queries.SharedBlockBodyFragment} />
      </AccordionItemPanel>
    </AccordionItem>
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

            <EntriesList collaborations={orderedEntries} />
          </div>
        </div>
      </div>
    </section>
  );
};
