Feature: Specify Number of Events
    Scenario: When user hasn’t specified a number, 32 events are shown by default
        Given that a list of events has been loaded to the app
        When a user opens the app OR uses a filter
        Then 32 events will be displayed on the page
    
    Scenario: User can change the number of events displayed
        Given the user is looking at a list of events
        When the user inputs a number OR selects a predefined option for number of events to be displayed
        Then the selected/inputted number of events will be displayed