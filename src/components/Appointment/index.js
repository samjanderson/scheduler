import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";
// import useVisualMode from ".../../hooks/useVisualMode";


export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  

  //return value from useVisualMode has three keys the mode, transition and back
  //good ol destructure to pull it out here
  //useVisualMode keeping track of web pages you visit like your browser, pushes a new webpage into your history
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //got this data from our form and now it is going to build an object out of it
  //takes the object and passes it back up to the application
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    //call the applications book interview so this is how we get it back up to application
    //transition to SHOW once props.bookinterview has successfully been called
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => (console.log(err)));
  }

  //WHAT IS MISSING??
  function cancel() {
    props.cancelInterview(props.id)
      .then(() => {
        transition(DELETING);
      })
      .catch((err) => (console.log(err)));
  }

  

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
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to cancel this interview?"
          onConfirm={cancel}//not sure what to put here
          onCancel={back} //not sure what to put here
        />)}
    </article>
  );

}
