import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import logo from "./meetApp_Logo.png"
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("You're currently offline so events may not be up to date");
    }
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    try {
      NProgress.start();
      const allEvents = await getEvents();
      const filteredEvents = currentCity === "See all cities" ?
        allEvents :
        allEvents.filter(event => event.location === currentCity)
      setEvents(filteredEvents?.slice(0, currentNOE) || []);
      setAllLocations(extractLocations(allEvents));
      NProgress.done();
    } catch (error) {
      console.error('Error fetching data:', error);
      NProgress.done();
    }
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
        <h4>Number of Events</h4>
        <NumberOfEvents numberInput={currentNOE} setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        <div className='charts-container'>
          <CityEventsChart allLocations={allLocations} events={events} />
          <EventGenresChart events={events} />
        </div>
        <EventList events={events} />  
      </div>
    </div>
  );
}

export default App;


