import * as React from "react";

type StopButton = {
    stop: () => void;
}

const StopButton = ({stop}: StopButton) => {
    return (
        <button
            type='button'
            className='btn btn-outline-light'
            onClick={stop}
        >
            Stop
        </button>
    )
};

export default StopButton;
