// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

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
  console.log(apptArr)
  return apptArr
}

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