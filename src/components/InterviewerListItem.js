import React from 'react';
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {
  //if the specific interview gets clicked on, the style changes to show they have been Class and passes in props
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li className={interviewerClass}
      onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
};


// onClick={() => props.setDay(props.name)}
//       className={dayClass}
// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };
// storiesOf("InterviewerListItem", module)
//   .addParameters({
//     backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
//   })
//   .add("UnClass", () => (
//     <InterviewerListItem
//       id={interviewer.id}
//       name={interviewer.name}
//       avatar={interviewer.avatar}