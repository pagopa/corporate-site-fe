import React from 'react';

import '../../sass/app.sass';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { HeadScripts } from './HeadScripts';
import './Layout.sass';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <HeadScripts />
      <main>{children}</main>
      <Footer />
    </>
  );
};
