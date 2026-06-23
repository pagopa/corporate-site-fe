import React from 'react';
import {
  Accordion,
  AccordionItem,
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
          <div className="accordion-entry__header">
            <AccordionItemButton className="accordion-entry__button">
              <h2 className="mb-0 h3">Posizioni chiuse</h2>
            </AccordionItemButton>
          </div>

          <AccordionItemPanel className="accordion-entry__content">
            <div>
              {pastJobs.map(job => (
                <JobEntry key={job.id} jobposition={job} closed />
              ))}
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
