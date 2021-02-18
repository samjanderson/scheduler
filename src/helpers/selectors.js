//go look at array methods, is there a function builtin for this?, find
export function getAppointmentsForDay(state, day) {
  const apptArr = [];
  for (let dayObj of state.days) {
    if (dayObj.name === day) {
      for (let appointmentID of dayObj.appointments) {
        apptArr.push(state.appointments[appointmentID]);
      }
    }
  }
  // console.log(apptArr)
  return apptArr;
}

export function getInterview(state, interview) {
  const interviewerObj = state.interviewers;
  const resultsObj = {};
  // console.log('state', state)
  console.log('interview', interview); //interview { student: 'Archie Cohen', interviewer: 2 }

  if (!interview) {
    return null;
  }

  const interviewerID = interview.interviewer;
  console.log('interviewID', interviewerID);
  for (let key in interviewerObj) {
    if (Number(key) === interviewerID) {
      resultsObj.student = interview.student;
      resultsObj.interviewer = interviewerObj[key];
    }
  }

  return resultsObj;
}


//BETTER VERSION OF GETAPPTS
// export function getAppointmentsForDay(state, day) {
//   const filteredDays = state.days.find((dayObj) => dayObj.name === day);
//   const apptArray = [];

//   if (state.appointments && filteredDays) {
//     filteredDays.appointments.forEach((appId) =>
//       apptArray.push(state.appointments[appId])
//     );
//   }
//   return apptArray;
// }