import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
// import useVisualMode from ".../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && 
      <Empty 
      onAdd={() => transition(CREATE)} 
      />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
       {mode === CREATE && (
          <Form 
          interviewers={props.interviewers} //wil become {interviewers}
          onSave={props.onSave} //what do I put in here?
          onCancel={() => back(EMPTY)} 
          />
      )}
    </article>
  );

}




// Update the Appointment component in index.js according to the following:

// All Appointment components will render a Header that takes in a time prop.
// If props.interview is truthy (an interview object) the Appointment will render the <Show /> component, else it should render the <Empty /> component.
// Using ternary operator version of conditional rendering makes the most sense in this case  where we want to render Show or Empty based on props.interview.