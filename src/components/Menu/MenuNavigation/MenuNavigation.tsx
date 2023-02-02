import classNames from 'classnames';
import React, { useState } from 'react';

import { MenuItem } from '../MenuItem';

import '../Menu.sass';

export const MenuNavigation = ({
  item,
  className
}: {
  item: Queries.MainNavigationItemFragment;
  className: string
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleSubmenu = () => {
    if (window.innerWidth < 1200) {
      setSubmenuOpen(prev => !prev);
    }
  };

  const { items, highlight } = item;

  const hasChilds = !!items?.length;

  return (
    <li
      onClick={handleSubmenu}
      className={classNames(
        className,
        hasChilds && 'w-sub',
        highlight && 'highlight',
        false && 'is-current',
        hasChilds && submenuOpen && 'is-sub-open',
      )}
    >
      <MenuItem item={item} disabled={hasChilds} />
      {hasChilds && (
        <ul>
          {items?.map(item => {
            return (
              item && (
                <li key={item?.id}>
                  <MenuItem item={item} />
                </li>
              )
            );
          })}
        </ul>
      )}
    </li>
  );
};
