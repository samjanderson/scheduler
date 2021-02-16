import React from 'react';
import "components/InterviewerList.scss";
import InterviewerListItem from 'components/InterviewerListItem';

export default function InterviewerList(props) {
   const interviewers = props.interviewers.map((interviewer) => {
     return (
       <InterviewerListItem
       key={interviewer.id}
       name={interviewer.name}
       avatar={interviewer.avatar}
       selected={interviewer.id === props.interviewer} 
       setInterviewer={event => props.setInterviewer(interviewer.id)} 
       />
     )
   });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
};


// export default function DayList(props) {
//   const days = props.days.map((day) => {
//     return (
//       <DayListItem
//         key={day.id}
//         name={day.name}
//         spots={day.spots}
//         selected={day.name === props.day}
//         setDay={props.setDay}
//       />
//     );
//   });
//   return <ul>{days}</ul>;
// }

