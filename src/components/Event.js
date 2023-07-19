import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);



  return (
    showDetails === false ? (
      <li>
        <div>{event.summary}</div>
        <div>{event.created}</div>
        <div>{event.location}</div>
        <button className="showDetails" onClick={() => setShowDetails(true)}>show details</button>
      </li>
    ) : (
      <li>
        <div>{event.summary}</div>
        <div>{event.created}</div>
        <div>{event.location}</div>
        <h3>About event:</h3>
        <a href={event.htmlLink}>See details on Google Calendar</a>
        <div>{event.description}</div>
        <button className="hideDetails" onClick={() => setShowDetails(false)}>hide details</button>
      </li>
    )
  );
};
  
export default Event;