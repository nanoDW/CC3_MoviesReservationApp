import React from "react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import ScreeningRoom from "./ScreeningRoom";
import "./ScheduleDay.css";

const ScheduleDay = props => {
  const dayScreenings = props.screenings.filter(screening => {
    return screening.day === props.day;
  });
  const displayDayButtons = dayScreenings.map(screening => {
    return (
      // <Button size="small" className="btn screening-button" key={screening.id}>
      //   {screening.hour}
      // </Button>
      <ScreeningRoom
        loggedIn={props.loggedIn}
        handleLogin={props.handleLogin}
        screeningId={screening.id}
        text={screening.hour}
      />
    );
  });
  return (
    <div className="schedule-day">
      <p className="schedule-date">{props.day}:</p>
      {displayDayButtons}
    </div>
  );
};

export default ScheduleDay;
