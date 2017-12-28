import React from 'react';
import { Button } from './Button';
import classNames from 'classnames';


export const Sort = ({ sortKey, activeSortKey, onSort, isSortReverse, children }) => {
  const sortClass = "button-inline"

  const arrow = classNames("arrow", {
    "down-arrow": sortKey === activeSortKey && !isSortReverse,
    "up-arrow": sortKey === activeSortKey && isSortReverse,
  });

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
      <div className={arrow}></div>
    </Button>
  );
};
