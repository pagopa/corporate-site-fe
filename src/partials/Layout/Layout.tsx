import React from 'react';
import { SEO } from '../../components/SEO';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { HeadScripts } from './HeadScripts';
import '../../sass/app.sass';
import './Layout.sass';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <SEO />
      <HeadScripts />
      <main>{children}</main>
      <Footer />
    </>
  );
};
