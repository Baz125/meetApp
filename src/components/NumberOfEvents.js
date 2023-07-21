import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE}) => {
    const [numberInput, setNumberInput] = useState("32");

    const handleChange = (event) => {
        setNumberInput(event.target.value);
        setCurrentNOE(event.target.value);
    };

    return (
        <div id="number-of-events">
            <input
                className="number-input"
                type="text"
                value={numberInput}
                onChange={handleChange}
            />
        </div>
    )
}

export default NumberOfEvents