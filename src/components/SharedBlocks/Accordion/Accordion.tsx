import React from 'react';
import { useLocation } from '@reach/router';

import {
  Accordion as AccordionContainer,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { Body } from '../../Remark';

import './Accordion.sass';

const AccordionItemComp = ({
  data: { content, heading },
}: {
  data: Queries.AccordionFragment;
}) => {
  return (
    <AccordionItem className="accordion-entry">
      <AccordionItemHeading className="accordion-entry__header">
        <AccordionItemButton className="accordion-entry__button">
          <span className="primary">{heading}</span>
        </AccordionItemButton>
      </AccordionItemHeading>

      <AccordionItemPanel className="accordion-entry__content">
        {content && <Body data={content} />}
      </AccordionItemPanel>
    </AccordionItem>
  );
};

export const Accordion = ({
  accordionItems,
  title,
  blockConf,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_ACCORDION_Fragment) => {
  const { pathname } = useLocation();
  const TitleTag = pathname.includes('fondo-innovazione') ? 'h2' : 'h3';
  const { BlockPosition, BlockWidth } = blockConf || {};

  // center default
  const columns: Record<'Standard' | 'Wide', string> = {
    Standard: `col-md-10 offset-md-1 col-lg-8 offset-lg-2`,
    Wide: `col-md-10 offset-md-1`,
  };

  if (BlockPosition === 'Left') {
    columns.Standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`;
    columns.Wide = `col-md-10 offset-md-1`;
  }
  if (BlockPosition === 'Right') {
    columns.Standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`;
    columns.Wide = `col-md-10 offset-md-3`;
  }

  return (
    <section className="block block-accordion">
      <div className="container-fluid">
        <div className="row">
          <div
            className={`col-12 ${
              BlockWidth ? columns[BlockWidth as 'Standard' | 'Wide'] ?? '' : ''
            }`}
          >
            <TitleTag className="h1">{title}</TitleTag>

            {accordionItems && (
              <AccordionContainer allowZeroExpanded>
                {accordionItems?.map((item, key) => {
                  return item ? (
                    <AccordionItemComp data={item} key={key} />
                  ) : null;
                })}
              </AccordionContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
