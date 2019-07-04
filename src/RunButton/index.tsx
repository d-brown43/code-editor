import * as React from "react";

type RunButton = {
    run: () => void;
}

const RunButton = ({run}: RunButton) => {
    return (
        <button
            type='button'
            className='btn btn-outline-light'
            onClick={run}
        >
            Run
        </button>
    )
};

export default RunButton;