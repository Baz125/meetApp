import { useState } from "react";

const Event = ( {event} ) => {
  const [showDetails, setShowDetails] = useState(false);


  return (
    <li className="event">
      <h2>{event && event.summary}</h2>
      <p>{event && event.created}</p>
      <p>{event && event.location}</p>
      {showDetails ?
        <p className="details">{event && event.description}</p> : 
        null
      }
      {showDetails ?
        <a href={event.htmlLink}>See details on Google Calendar</a> :
        null
      }
      <button className="details-btn" onClick={() => {
      showDetails ? setShowDetails(false) : setShowDetails(true)
      }}>{showDetails ? "hide details" : "show details" }</button>
    </li>
  )
};
  
export default Event;