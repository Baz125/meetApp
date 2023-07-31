import { useState } from "react";

const Event = ( {event} ) => {
  const [showDetails, setShowDetails] = useState(false);


  return (
    <li className="event">
      <h2 className="event-summary">{event && event.summary}</h2>
      <p className="event-time">{new Date(event.start.dateTime).toString()}</p>
      <p>{event && event.location}</p>
      {showDetails ?
        <a className="calendar-button" href={event.htmlLink} target="_blank" rel="noopener noreferrer">See details on Google Calendar</a> :
        null
      }
      {showDetails ?
        <>
          <h3>About the event:</h3>
          <p className="details">{event && event.description}</p>  
        </> :
        null   
      }
      <button className="details-btn link" onClick={() => {
      showDetails ? setShowDetails(false) : setShowDetails(true)
      }}>{showDetails ? "hide details" : "show details" }</button>
    </li>
  )
};
  
export default Event;