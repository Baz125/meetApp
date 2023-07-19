import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';


describe('<Event /> component', () => { 
    test('renders event summary', async () => {
        const allEvents = await getEvents();
        let EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });
    test('renders start time', async () => {
        const allEvents = await getEvents();
        let EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });
    test('renders event location', async () => {
        const allEvents = await getEvents();
        let EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });
    test('renders event details button with title (show details)', async () => {
        const allEvents = await getEvents();
        let EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
    test('by default, event details should be hidden', async () => {
        const allEvents = await getEvents();
        let EventComponent = render(<Event event={allEvents[0]} />);
        expect(EventComponent.queryByText(allEvents[0].description)).not.toBeInTheDocument();
    });
    test('extra details shown when user clicks show details', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        let EventComponent = render(<Event event={allEvents[0]} />);
        const showDetailsButton = EventComponent.getByRole("button", { name: "show details" });        //user clicks
        await user.click(showDetailsButton);
        expect(EventComponent.queryByText('About event:')).toBeInTheDocument();
        expect(EventComponent.queryByText('See details on Google Calendar')).toBeInTheDocument();
        //expect(EventComponent.queryByText(allEvents[0].description)).toBeInTheDocument();
        expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
    })
    test('extra details hidden when user clicks hide details', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        let EventComponent = render(<Event event={allEvents[0]} />);
        const showDetailsButton = EventComponent.getByRole("button", { name: "show details" });
        //user clicks show
        await user.click(showDetailsButton);
        const hideDetailsButton = EventComponent.getByRole("button", { name: "hide details" });
        //user clicks hide
        await user.click(hideDetailsButton);
        expect(EventComponent.queryByText('About event:')).not.toBeInTheDocument();
        expect(EventComponent.queryByText('See details on Google Calendar')).not.toBeInTheDocument();
        // expect(EventComponent.queryByText(allEvents[0].description)).toBeInTheDocument();
        expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
    })
})