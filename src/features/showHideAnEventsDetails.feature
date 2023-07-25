Feature: Show and hide an event's details
    Scenario: An event element is collapsed by default
        Given a list of events has been loaded to the app;
        When the user opens the main page OR fliters events by city;
        Then the user will see a number of collapsed events, containing a brief summary or the first few words of the description

    Scenario: User can expand an event to see details
        Given the user is looking at a list of events;
        When the user cicks the details button on a particular event;
        Then the event will expand showing more details.

    Scenario: User can collapse an event to hide details.
        Given a user has expanded an event
        When the user selects an option to collapse
        Then the event element will collapse leaving more screen room for the list