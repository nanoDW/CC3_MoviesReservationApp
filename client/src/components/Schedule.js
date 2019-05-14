import React from "react";
import { Placeholder } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import moment from "moment";

import "./Schedule.css";

const Schedule = props => {
  console.log(props.screenings);
  const screeningList = props.screenings.map(screening => {
    return {
      id: screening._id,
      day: moment(screening.date).format("DD.MM.YYYY"),
      hour: moment(screening.date).format("kk:mm")
    };
  });
  const screeningDisplay = screeningList.map(screening => {
    return (
      <li>
        {screening.day}, {screening.hour}
      </li>
    );
  });
  console.log(screeningList);
  console.log(screeningDisplay);
  //   const screeningList = props.screenings.map(screening => {
  //     return (
  //       <>
  //         <div key={screening._id}>{screening.date}</div>
  //       </>
  //     );
  //   });
  return (
    <div className="movie-schedule">
      <h3>Weekly Schedule</h3>
      <ul>{screeningDisplay}</ul>
    </div>
  );
};

export default Schedule;
