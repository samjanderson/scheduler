import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);


  const setDay = day => setState({ ...state, day });

  //function to update the state when booking an interview
  function bookInterview(id, interview) {
    // console.log('bookInterview', id, interview);
    //here we use immutable patterns to update the state object
    //here we are spreading the OG appointment, and then setting/overriding the interview key
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //here we are spreading the OG appointments object
    //we reassign a particular keys value with that given appt we just booked
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment) //url, {interview}
      .then(() => {
        //not props in here as state lives inside the custom hook
        //why dont we do state.appointments here?, it wont know that the interview has been cancelled so we need to pass in new appts
        const foundDay = state.days.find(howToFindDay);

        const spotsRemaining = calcSpotsRemaining(appointments, foundDay);

        //copy of OG day with updated spots remaining, update a piece of state so we spread the day and update a key
        const newDayObj = { ...foundDay, spots: spotsRemaining };

        //to get index we want to overwrite in days array
        //days is an array not an object so we need to use findIndex here
        const dayIndex = state.days.findIndex(howToFindDay);
        //we do this in two steps because we cant push so we copy the array and then overwrite the index
        const copyOGStateDays = [...state.days];
        copyOGStateDays[dayIndex] = newDayObj;
        setState((prev) => ({
          ...prev,
          appointments,
          days: copyOGStateDays
        }));
      });

  }

  //result of state.days.find is our foundDay its gets us that specific day obj
  function calcSpotsRemaining(appointments, foundDay) {
    let spots = 0;
    for (const appointmentID of foundDay.appointments) {
      //looking to see whether or not interview property has an interview or null like below
      //     2: { id: 2, time: "1pm", interview: null } this here
      // console.log(appointments[appointmentID].interview);
      if (!appointments[appointmentID].interview) {
        spots += 1;
      }
    }
    return spots;
  }
  //used for book interview and cancel interview
  const howToFindDay = (currentDay) => {
    return currentDay.name === state.day;
  };
  //function to update the state when cancelling an interview
  const cancelInterview = (id) => {
    //create new appointment and appointments object
    //here we incrementally build up to overwrite state, we start from the middle/inner most nested piece
    //review changing local state section in creating appointments
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    //still need to create appointments object but instead of an interview object being passed in you are passing in interview as null
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //not props in here as state lives inside the custom hook
        //why dont we do state.appointments here?, it wont know that the interview has been cancelled so we need to pass in new appts
        const foundDay = state.days.find(howToFindDay);

        const spotsRemaining = calcSpotsRemaining(appointments, foundDay);

        //copy of OG day with updated spots remaining, update a piece of state so we spread the day and update a key
        const newDayObj = { ...foundDay, spots: spotsRemaining };

        //to get index we want to overwrite in days array
        //days is an array not an object so we need to use findIndex here
        const dayIndex = state.days.findIndex(howToFindDay);
        //we do this in two steps because we cant push so we copy the array and then overwrite the index
        const copyOGStateDays = [...state.days];
        copyOGStateDays[dayIndex] = newDayObj;
        setState((prev) => ({
          ...prev,
          appointments,
          days: copyOGStateDays
        })); //overwrite state of days with new day Obj
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}


//EXTRA CODE FOR REFERNCE/NOTES BELOW (FOR LEARNING PURPOSES)


//changing appointment and appointments to use state properly as per Andy
//
// Right now, you're taking advantage of the implicit return:
// setState((prev) => ({
//   ...prev,
//   appointments,
//   days: copyOGStateDays
// }));
// We need to use the whole syntax so that we can create our appointment and appointments.
// setState((prev) => {
//   return {
//     ...prev,
//     appointments,
//     days: copyOGStateDays
//   };
// });
// Now we have a function we can paste our two constants into and spread prev instead of state
// // final outcome
// setState((prev) => {
//   const appointment = {
//     ...prev.appointments[id],
//     interview: null,
//   };
//   const appointments = {
//     ...prev.appointments,
//     [id]: appointment,
//   };
//   return {
//     ...prev,
//     appointments,
//     days: copyOGStateDays
//   };
// });



//FindIndex taught by the Great Andy to look up for reference
// const array1 = [5, 12, 8, 130, 44];

// const isLargeNumber = (element) => element > 13;

// console.log(array1.findIndex(isLargeNumber));
// // expected output: 3


// UPDATE SPOTS CODE ALONG
// null interview === spots available
// count appts for day that have an empty interview
// const updateSpots = function (day, days, appointments) { //days is an arr, appointments an obj, day is a string like Monday


//   // find day object
//   const dayObj = days.find(item => item.name === day);

//   // get appointment array
//   //iterate appointment array
//   const appointmentIDs = dayObj.appointments //(now we have array of appts);
//   let spots = 0; //let because we will be changing it
//   for (const id of appointmentIDs) {
//     const appointment = appointments[id];
//     if (!appointment.interview) {
//       spots++;
//     }
//   }

//   //nothing has changed up to this point and below is where it gets dangerous
//   //now we are changing dayObj 
//   dayObj.spots = spots;

//   // if interview is null result spots++
//   // update the spots in the dayObj (which is part of days)
//make sure to copy the original days so it updates state here
//   const newDays = [...days]
//   //now updateSpots returns a completely new days array with an updated day object that doesnt affect oroginal 
//   return newDays;

// };

//now in his then (this portion of the code goes inside your .then of your cancel appt and book appt)
//const days = updateSpots(state.day, state.days, appointments)
//we replace appointments and days with new information of updated spots
//here you will remove your original setState call and update it to also take in the new days
//setState(prev => ({...prev, appointments, days}))

 //example data for reference
  // const state = {
  //   days: [
  //     {
  //       id: 1,
  //       name: "Monday",
  //       appointments: [1, 2, 3],
  //       interviewers: [1, 2],
  //     },
  //     {
  //       id: 2,
  //       name: "Tuesday",
  //       appointments: [4, 5],
  //     },
  //   ],
  //   appointments: {
  //     1: { id: 1, time: "12pm", interview: null },
  //     2: { id: 2, time: "1pm", interview: null },
  //     3: {
  //       id: 3,
  //       time: "2pm",
  //       interview: { student: "Archie Cohen", interviewer: 2 },
  //     },
  //     4: { id: 4, time: "3pm", interview: null },
  //     5: {
  //       id: 5,
  //       time: "4pm",
  //       interview: { student: "Chad Takahashi", interviewer: 2 },
  //     },
  //   },
  //   interviewers: {
  //     1: {
  //       id: 1,
  //       name: "Sylvia Palmer",
  //       avatar: "https://i.imgur.com/LpaY82x.png",
  //     },
  //     2: {
  //       id: 2,
  //       name: "Tori Malcolm",
  //       avatar: "https://i.imgur.com/Nmx0Qxo.png",
  //     },
  //   },
  // };