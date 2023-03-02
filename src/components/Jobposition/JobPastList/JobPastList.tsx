import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import { JobEntry } from '../JobEntry';

export const JobPastList = ({
  pastJobs,
}: {
  pastJobs: Queries.JobpositionFragment[];
}) => {
  return (
    <div className="jobs-listing__past">
      <Accordion allowZeroExpanded>
        <AccordionItem className="accordion-entry">
          <AccordionItemHeading className="accordion-entry__header">
            <AccordionItemButton className="accordion-entry__button">
              <h3 className="mb-0">Posizioni chiuse</h3>
            </AccordionItemButton>
          </AccordionItemHeading>

          <AccordionItemPanel className="accordion-entry__content">
            <div>
              {pastJobs.map(job => (
                <JobEntry key={job.id} jobposition={job} />
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
