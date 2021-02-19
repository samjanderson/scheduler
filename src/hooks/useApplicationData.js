import React, { useState, useEffect } from "react";
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
      axios.get("api/interviewers")
    ]).then((all) => {
      // const [first, second] = all;
      // console.log(first, second);
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  // useEffect(() => {
  //   axios.put("/api/appointments/:id").then(response => {
  //     console.log(response);
  //   });
  // }, []);

  const setDay = day => setState({ ...state, day });

  //function to update the state when booking an interview
  function bookInterview(id, interview) {
    console.log('bookInterview', id, interview);
    //here we use immutable patterns to update the state object
    //here we are spreading the OG appointment, and then setting/overriding the interview key
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //here we are spreading the OG appointsment object
    //we reassign a particular keys value with that given appt we just booked
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment)
      .then(() => {
        //not props in here as state lives inside the custom hook
        //why dont we do state.appointments here?, it wont know that the interview has been cancelled so we need to pass in new appts
        const foundDay = state.days.find(howToFindDay);
        console.log(foundDay);
        const spotsRemaining = calcSpotsRemaining(appointments, foundDay);
        console.log(spotsRemaining);
        //copy of OG day with updated spots remaining, update a piece of state so we spread the day and update a key
        const newDayObj = { ...foundDay, spots: spotsRemaining };
        console.log(newDayObj);
        //to get index we want to overwrite in days array
        //days is an array not an object so we need to use findIndex here
        const dayIndex = state.days.findIndex(howToFindDay);
        //we do this in two steps because we cant push so we copy the array and then overwrite the index
        const copyOGStateDays = [...state.days];
        copyOGStateDays[dayIndex] = newDayObj;
        setState({
          ...state,
          appointments,
          days: copyOGStateDays //overwrite state of days with new day object
        });
      });

  }

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

  //result of state.days.find is our foundDay its gets us that specific day obj
  function calcSpotsRemaining(appointments, foundDay) {
    let spots = 0;
    for (const appointmentID of foundDay.appointments) {
      //looking to see whether or not interview property has an interview or null
      //     2: { id: 2, time: "1pm", interview: null } this here
      console.log(appointments[appointmentID].interview);
      if (!appointments[appointmentID].interview) {
        spots += 1;
      }
    }
    return spots;
  }
  //WILL ALSO USE FOR BOOK INTERVIEW
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
        console.log(foundDay);
        const spotsRemaining = calcSpotsRemaining(appointments, foundDay);
        console.log(spotsRemaining);
        //copy of OG day with updated spots remaining, update a piece of state so we spread the day and update a key
        const newDayObj = { ...foundDay, spots: spotsRemaining };
        console.log(newDayObj);
        //to get index we want to overwrite in days array
        //days is an array not an object so we need to use findIndex here
        const dayIndex = state.days.findIndex(howToFindDay);
        //we do this in two steps because we cant push so we copy the array and then overwrite the index
        const copyOGStateDays = [...state.days];
        copyOGStateDays[dayIndex] = newDayObj;
        setState({
          ...state,
          appointments,
          days: copyOGStateDays //overwrite state of days with new day object
        });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}

// const array1 = [5, 12, 8, 130, 44];

// const isLargeNumber = (element) => element > 13;

// console.log(array1.findIndex(isLargeNumber));
// // expected output: 3
