import { useState } from "react";

const NumberOfEvents = () => {
    const [numberInput, setNumberInput] = useState("32");

    const handleChange = (event) => {
        setNumberInput(event.target.value);
    };

    return (
        <div id="number-of-events">
            <input
                className="number-input"
                type="text"
                value={numberInput}
                onChange={handleChange}
                placeholder="32"
            />
        </div>
    )
}

export default NumberOfEvents