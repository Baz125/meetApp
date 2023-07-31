import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import logo from "./meetApp_Logo.png"
import { InfoAlert, ErrorAlert } from './components/Alert';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
      setEvents(filteredEvents?.slice(0, currentNOE) || []);
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
      </div>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="https://Baz125.github.io/meetApp/">
            <img src={logo} alt="meet-app-logo" width="100" height="100" />
          </a>
        </div>
        <div className="navbar-search">
          <div className="search">
            <h5>Search for a city</h5>
          </div>
          <CitySearch
            allLocations={allLocations}
            setCurrentCity={setCurrentCity}
            setInfoAlert={setInfoAlert}
          />
        </div>
      </nav>
      <div className="body">
        <h1>Welcome to meetApp!</h1>
        <h3>Find events in your city</h3>
        <h4>Please help me by testing some of the functionality:</h4>
        <ul className="tester-instructions">
          <li>1- Change the number of events displayed </li>
          <li>2- Filter events by a city</li>
          <li>3- Click details button to expand an event to and see more information</li>
          <li>4- Click to view the event in Google Calendar</li>
        </ul>
        <h4>Number of Events</h4>
        <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        <EventList events={events} />  
      </div>
    </div>
  );
}

export default App;


