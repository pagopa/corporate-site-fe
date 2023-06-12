import '@popperjs/core/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import { RootWrapper } from './src/components/RootWrapper';

export const wrapRootElement = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};
