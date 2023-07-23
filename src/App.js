import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import logo from "./meetApp_Logo.png"

const App = () => {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

  return (
    <div className="App">
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
          <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
        </div>
      </nav>
      <div className="body">
        <h4>Number of Events</h4>
        <NumberOfEvents setCurrentNOE={setCurrentNOE} />
        <EventList events={events} />  
      </div>
    </div>
  );
}

export default App;


