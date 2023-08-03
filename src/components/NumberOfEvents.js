import { useState } from "react";

const NumberOfEvents = ({numberInput, setCurrentNOE, setErrorAlert}) => {
    // const [numberInput, setNumberInput] = useState("32");

    const handleChange = (event) => {
        //setNumberInput(event.target.value);
        setCurrentNOE(event.target.value);
        if (isNaN(event.target.value) || event.target.value <= 0) {
            setErrorAlert("Only positive numbers are allowed");
        } else {
            setErrorAlert("");
        }
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

export default NumberOfEvents;