import React from 'react';

import '../../sass/app.sass';
import { Footer } from '../Footer';
import {Header} from '../Header';
import './Layout.sass';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header/>
      <main>{children}</main>
      <Footer />
    </>
  );
};
