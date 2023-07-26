import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
        let AppComponent;
        given('a list of events has been loaded to the app;', () => {           
        });       
        when('the user opens the main page OR fliters events by city;', () => {
            AppComponent = render(<App />);
        });
        then('the user will see a number of collapsed events, containing a brief summary or the first few words of the description', async () => {
            
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const eventSummaryElement = EventListDOM.querySelector('.event-summary');
                expect(eventSummaryElement).toBeInTheDocument();
            });

            await waitFor(() => {
                const eventDetailsElement = EventListDOM.querySelector('.details');
                expect(eventDetailsElement).not.toBeInTheDocument
            });
        });
    });

    test('User can expand an event to see details', ({ given, when, then }) => {     
        let AppComponent;          
        given('the user is looking at a list of events;', () => {
            AppComponent = render(<App />);
        });
        let EventListDOM
        when('the user cicks the details button on a particular event;', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');
            const detailsButton = within(EventListDOM).queryByRole("button");
            user.click(detailsButton);           
        });
        then('the event will expand showing more details.', async () => {
            await waitFor(() => {
                const AppDOM = AppComponent.container.firstChild;
                const EventListDOM = AppDOM.querySelector('#event-list');
                const eventDetailsElement = EventListDOM.querySelector('.details');
                expect(eventDetailsElement).toBeInTheDocument
            });
        });
    })

    test('User can collapse an event to hide details.', ({ given, when, then }) => {
        let AppComponent; 
        let EventListDOM
        let detailsButton
        given('a user has expanded an event', async () => {
            const user = userEvent.setup();
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            EventListDOM = AppDOM.querySelector('#event-list');           
            detailsButton = within(EventListDOM).queryByRole("button");
            await user.click(detailsButton);
        });
        when('the user selects an option to collapse', async () => {
            const user = userEvent.setup();
            await user.click(detailsButton);
        });
        then('the event element will collapse leaving more screen room for the list', async () => {
            await waitFor(() => {
                const eventDetailsElement = EventListDOM.querySelector('.details');
                expect(eventDetailsElement).not.toBeInTheDocument
            });
        });
    });
})