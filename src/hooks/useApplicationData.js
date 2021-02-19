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
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const url = `/api/appointments/${id}`;
    return axios.put(url, appointment)
      .then(response => {
        console.log(response);
        //call setState with the new state object to apply changes
        setState({
          ...state,
          appointments
        });
      });

  }

  //function to update the state when cancelling an interview
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        appointment.interview = null;
        setState({
          ...state,
          appointments
        });
      });
  };

  return { state, setDay, bookInterview, cancelInterview };
}

