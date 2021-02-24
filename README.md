# Interview Scheduler

Scheduler is a single-page app built with React where the user can book an appointment with an interviewer. There are 5 appointment slots for each day (Monday-Friday). An appointment can be edited or cancelled by the user. 

PostgreSQL is used as the database. Jest, Cypress and Storybook were also all used throughout the development process for testing purposes.

## Screenshots

The appointments section on the app is made up of various components that render depending on the state.

!["Creating Appointment"](https://github.com/samjanderson/scheduler/blob/master/docs/creating-appt.png?raw=true)
!["Cancel Appointment"](https://github.com/samjanderson/scheduler/blob/master/docs/cancel-appt.png?raw=true)
!["Error Mode"](https://github.com/samjanderson/scheduler/blob/master/docs/error-mode.png?raw=true)
!["Error Mode"](https://github.com/samjanderson/scheduler/blob/master/docs/User%20Flow%20Movie.gif?raw=true)


## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
