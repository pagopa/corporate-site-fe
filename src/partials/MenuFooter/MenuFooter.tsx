import React from 'react';

import { Cta } from '../Cta';

import './MenuFooter.sass';

export const MenuFooter = () => {
  // const data = useMenuFooter()

  const menu: any[] = []; //data.nodes

  return (
    <nav className="menu-footer">
      <ul>
        {menu.map((item, key) => {
          const { path, label, target } = item;
          return (
            <li key={key}>
              <Cta
                url={path}
                blank={target}
                label={label}
                variant="link-simple"
                href="#/"
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
