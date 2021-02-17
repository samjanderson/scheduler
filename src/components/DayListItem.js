import React from "react";

import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  //this is a string that will always be there, so its something you want to have at the end
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
 
  const formatSpots = function () {
    return props.spots === 0
      ? "no spots remaining"
      : props.spots === 1
      ? "1 spot remaining"
      : `${props.spots} spots remaining`;
  };


  // const formatSpots = () => {
  //   if (props.spots === 0) {
  //     return "no spots remaining";
  //   } else if (props.spots === 1) {
  //     return "1 spot remaining";
  //   } else {
  //     return props.spots + " spots remaining";
  //   }
  // };


  return (
    <li onClick={props.setDay} //data-testid="day" //onClicks job is to call a function, if someone clicks on this day, call this function
      className={dayClass}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}