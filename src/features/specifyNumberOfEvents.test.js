import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {
        given('that a list of events has been loaded to the app', () => {
        });
        let AppComponent
        when('a user opens the app OR uses a filter', () => {
            AppComponent = render(<App />);
        });
        then(/^(\d+) events will be displayed on the page$/, async (arg0) => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });
    test('User can change the number of events displayed', ({ given, when, then }) => {
        let AppComponent;
        let numberTextBox;
        let NumberOfEventsDOM;
        let EventsListDOM;
        given('the user is looking at a list of events', async () => {
            AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            NumberOfEventsDOM = AppDOM.querySelector('#number-of-events')
            EventsListDOM = AppDOM.querySelector('#event-list')
            await waitFor(() => {
                numberTextBox = within(NumberOfEventsDOM).queryByRole('textbox');
            });
        });

        when('the user inputs a number OR selects a predefined option for number of events to be displayed', async () => {
            const user = userEvent.setup();
            await user.type(numberTextBox, '{backspace}{backspace}10');

        });
        then('the selected/inputted number of events will be displayed', async () => {
            const EventListItems = within(EventsListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toEqual(Number(numberTextBox.value));
        });
    });
});
