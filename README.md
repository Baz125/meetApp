# MeetApp

Find events happening in your city!

meetApp is a serverless progressive web application(PWA) built using the principles of Test-Driven Development. meetApp ingests events from the Google Calendar API and allows users to filter events by city, see more details about events, and supports onffline use.

This is a portfolio project focussing on severless funcitons, OAuth and Test-Driven Development and Continuous Development.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Authentication](#authentication)
- [Monitoring](#real-time-monitoring)
- [Features and User Scenarios](#features-and-scenarios)


## Technologies Used

- Node.js
- React
- Jest
- Cucumber
- Atatus Performance Monitoring
- AWS Lambda serverless functions
- Recharts
- Google OAuth
- Google calendar API

The app uses React, OAuth2 authentication flow, serverless functions with AWS Lambda. It passes Lighthouse's PWA checklist and is monitored by an online performance monitoring tool.

Serverless functions are used to for OAuth and for managing API calls from Goole Calendar. Serverless was chosen for its easy of setup and AWS was chose for, among other reasons, for its effective local testing and debugging tools.

This app is currently deployed on GitHub Pages: https://baz125.github.io/meetApp/

## Authentication

An authentication flow is built using a serverless function on AWS Lambda and Google OAuth. This is currently the only login option so users will need a Google accout to access.

## Real time monitoring

This app has been integrated with Attatus real time monitoring which is configured to alert for any issues in production.

## Features and Scenarios

Feature 1: Filter Events by City

Scenario 1: When user hasn’t searched for a specific city, show upcoming events from all cities.
Given user hasn’t searched for any city;
When the user opens the app;
Then the user should see a list of upcoming events.

Scenario 2: User should see a list of suggestions when they search for a city.
Given the main page is open;
When user starts typing in the city textbox;
Then the user should receive a list of cities (suggestions) that match what they’ve typed.

Scenario 3: User can select a city from the suggested list.
Given user was typing “Berlin” in the city textbox AND the list of suggested cities is showing;
When the user selects a city (e.g., “Berlin, Germany”) from the list;
Then their city should be changed to that city (i.e., “Berlin, Germany”) AND the user should receive a list of upcoming events in that city.

Feature 2: Show/Hide Event Details

Scenario 1: An event element is collapsed by default.
Given a list of events has been loaded to the app;
When the user opens the main page OR fliters events by city;
Then the user will see a number of collapsed events, containing a brief summary or the first few words of the description

Scenario 2: User can expand an event to see details.
Given the user is looking at a list of events;
The user can select a particular event;
Then the event will expand showing more details.

Scenario 3: User can collapse an event to hide details.
Given a user has expanded an event
When the user selects an option to collapse
Then the event element will collapse leaving more screen room for the list

Feature 3: Specify Number of Events

Scenario 1: When user hasn’t specified a number, 32 events are shown by default.
Given that a list of events has been loaded to the app;
When a user opens the app OR uses a filter;
Then 32 events will be displayed on the page

Scenario 2: User can change the number of events displayed.
Given the user is looking at a list of events
When the user inputs a number OR selects a predefined option for number of events to be displayed
Then the selected/inputted number of events will be displayed

Feature 4: Use the App When Offline

Scenario 1: Show cached data when there’s no internet connection.
Given that cached data has been stored on the device AND the device has no internet connection
When the user opens the application
Then the cached data will be shown/available to the user

Scenario 2: Show error when user changes search settings (city, number of events).
Given that cached data has been stored on the device AND the device has no internet connection
When the user changes search settings
Then an error message will be shown to the user

Feature 5: Add an App Shortcut to the Home Screen

Scenario 1: User can install the meet app as a shortcut on their device home screen.
Given the app is loaded/displaying on the device
When the user selects an option to add as shortcut
Then a shortcut to the app will appear on the device’s home screen

Feature 6: Display Charts Visualizing Event Details

Scenario 1: Show a chart with the number of upcoming events in each city.
Given that a list of events in many cities is loaded to the device
When the users navigates or scrolls to an overview or chart option
A chart visualising the events in each city will be displayed
