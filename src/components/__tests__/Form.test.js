import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react"; //fireEvent is how we fire DOM events

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {  //describes sole purpose is to group our tests together
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />); //could replace interviewers with an empty array here so the map doesnt fail
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(<Form interviewers={interviewers} name="Lydia Miller-Jones" />);
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. validation is shown */
    const onSave = jest.fn() //declare mock function for onSave and pass in the same way we pass it in index.js
    const { getByText } = render(<Form interviewers={interviewers} onSave={onSave} />);
    fireEvent.click(getByText("Save")); //could also add a data-testid and get it by that like we did in line 25
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument(); //here we are using a regex with the case insensitive flag, we do this instead of a string so we can do the case insensitive match


    /* 2. onSave is not called */
    expect(onSave).not.toHaveBeenCalled(); //this has to be a mock function since we are using toHaveBeenCalled
  });

  it("calls onSave function when the name is defined", () => {
    /* 3. validation is not shown */
    const onSave = jest.fn()  //onSave is now this mock jest function
    const { getByText, queryByText } = render(<Form interviewers={interviewers} onSave={onSave} name="Lydia Miller-Jones"  />);
    fireEvent.click(getByText("Save")); 
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(onSave).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

});