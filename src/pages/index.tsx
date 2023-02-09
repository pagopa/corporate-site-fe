import { Link } from 'gatsby';
import React from 'react';
import { Layout } from '../partials/Layout';

const IndexPage = () => (
  <Layout>
    <div className="p-4" style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to="jobpositions">Jobpositions</Link>
      <Link to="media/comunicati-stampa">comunicati stampa</Link>
      <Link to="media/news-ed-eventi">news ed eventi</Link>
      <Link to="media/newsletter">newsletter</Link>
    </div>
  </Layout>
);

export default IndexPage;
