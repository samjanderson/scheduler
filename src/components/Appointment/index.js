import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";


export default function Appointment(props) {
  // console.log("props.interview", props.interview)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {props.interview 
      ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> 
      : <Empty />}
    </article>
  );

}




// Update the Appointment component in index.js according to the following:

// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.
// Using ternary operator version of conditional rendering makes the most sense in this case  where we want to render Show or Empty based on props.interview.