import React, { MouseEventHandler } from 'react';

import './Hamburger.sass';

export const Hamburger = ({
  handler,
}: {
  handler: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <>
      <button className="hamburger" onClick={handler}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </>
  );
};
