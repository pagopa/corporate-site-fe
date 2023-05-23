import classNames from 'classnames';
import React, { useState } from 'react';
import { MenuItem } from '../MenuItem';
import '../Menu.sass';
import { useLocation } from '@reach/router';

export const MenuNavigation = ({
  item,
  className,
}: {
  item: Queries.MainNavigationItemFragment;
  className: string;
}) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const { pathname } = useLocation();

  const handleSubmenu = () => {
    if (window.innerWidth < 1200) {
      setSubmenuOpen(prev => !prev);
    }
  };

  const { items, highlight } = item;
  const isCurrent = pathname.split('/').includes(item.uiRouterKey as string);
  const hasChildren = !!items?.length;

  return (
    <li
      onClick={handleSubmenu}
      className={classNames(
        className,
        hasChildren && 'w-sub',
        highlight && 'highlight',
        isCurrent && 'is-current',
        hasChildren && submenuOpen && 'is-sub-open'
      )}
    >
      <MenuItem item={item} disabled={hasChildren} />
      {hasChildren && (
        <ul>
          {items?.map(item => {
            return (
              item && (
                <li
                  key={item?.id}
                  className={classNames(
                    className,
                    item.highlight && 'alternative'
                  )}
                >
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
