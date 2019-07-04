import * as React from "react";
import styles from './ConsoleLog.module.scss';

type ConsoleLog = {
    logMessages: string[];
};

const ConsoleLog = ({logMessages}: ConsoleLog) => {
    return (
        <div className={styles.container}>
            {logMessages.map((message, index) => (
                <div key={index}>
                    {message}
                </div>
            ))}
        </div>
    );
};

export default ConsoleLog;