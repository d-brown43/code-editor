import * as React from 'react';
import styles from './Controls.module.scss';
import RunButton from '../RunButton';
import StopButton from "../StopButton/StopButton";

type Controls = {
    run: () => void;
    stop: () => void;
};

const Controls = ({run, stop}: Controls) => {
    return (
        <div className={styles.container}>
            <RunButton run={run} />
            <StopButton stop={stop}/>
        </div>
    )
};

export default Controls;
