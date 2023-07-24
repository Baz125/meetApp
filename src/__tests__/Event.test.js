import { render } from '@testing-library/react';
import Event from '../components/Event';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';

describe('<Event /> component', () => {
    let EventComponent
    let allEvents
    beforeEach(async () => {
        allEvents = await getEvents();
        EventComponent = render(<Event event={allEvents[0]} />)
    });

    test('renders event summary', async () => {
        expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

    test('renders event location', async () => {
        expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });

    test('renders event details button with title (show details)', async () => {
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });

    test('by default, event details should be hidden', async () => {
        expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });

    test('extra details shown when user clicks show details', async () => {
        const user = userEvent.setup();

        const showDetailsButton = EventComponent.getByRole("button", { name: "show details" });   
        await user.click(showDetailsButton);

        expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
        expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
        expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
    })

    test('extra details hidden when user clicks hide details', async () => {
        const user = userEvent.setup();

        const showDetailsButton = EventComponent.getByRole("button", { name: "show details" });
        await user.click(showDetailsButton);
        const hideDetailsButton = EventComponent.getByRole("button", { name: "hide details" });
        await user.click(hideDetailsButton);

        expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
        expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
        expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
});