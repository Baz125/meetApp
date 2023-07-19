import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import userEvent from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
    test('has element with the role of textbox', () => {
        let NumberOfEventsComponent = render(<NumberOfEvents />);
        expect(NumberOfEventsComponent.queryByRole("textbox")).toBeInTheDocument();
    })
    test('default input value is 32', () => {
        let NumberOfEventsComponent = render(<NumberOfEvents />);
        const numberTextBox = NumberOfEventsComponent.getByPlaceholderText("32");
        expect(numberTextBox).toHaveValue("32");
        // expect(NumberOfEventsComponent.getByPlaceholderText("32")).toBeInTheDocument();
    })
    test('value of number-input changes as user types', async () => {
        const user = userEvent.setup();
        let NumberOfEventsComponent = render(<NumberOfEvents />);
        const numberTextBox = NumberOfEventsComponent.getByPlaceholderText("32");
        await user.type(numberTextBox, '{backspace}{backspace}10');
        expect(numberTextBox).toHaveValue("10");
    })
})