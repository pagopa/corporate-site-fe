import { Link } from 'gatsby';
import React from 'react';
import { Layout } from '../partials/Layout';

const IndexPage = () => (
  <Layout>
    <div className="p-4">
      <div className="col">
        <Link to="jobpositions">Jobpositions</Link>
      </div>
      <div className="col">
        <Link to="media/comunicati-stampa">comunicati stampa</Link>
      </div>
    </div>
  </Layout>
);

export default IndexPage;
