import * as React from 'react';
import styles from './Controls.module.scss';
import RunButton from '../RunButton';

type Controls = {
    run: () => void;
};

const Controls = ({run}: Controls) => {
    return (
        <div className={styles.container}>
            <RunButton run={run} />
        </div>
    )
};

export default Controls;
