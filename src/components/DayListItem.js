import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  //this is a string that will always be there, so its something you want to have at the end
  const dayClass = classNames("day-list__item", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });


  return (
    <li onClick={() => props.setDay(props.name)}
      className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}