import React from "react";
// import { Placeholder } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";

import "./Schedule.css";
import ScheduleDay from "./ScheduleDay";

const Schedule = props => {
  const screeningList = props.screenings.map(screening => {
    return {
      id: screening._id,
      day: moment(screening.date).format("DD.MM.YYYY"),
      hour: moment(screening.date).format("kk:mm")
    };
  });
  const days = screeningList
    .map(screening => {
      return screening.day;
    })
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  const screeningDisplay = days.map(day => {
    return (
      <ScheduleDay
        day={day}
        screenings={screeningList}
        loggedIn={props.loggedIn}
        handleLogin={props.handleLogin}
      />
    );
  });
  return (
    <div className="movie-schedule">
      <h3>Weekly Schedule</h3>
      {screeningDisplay}
    </div>
  );
};

export default Schedule;
