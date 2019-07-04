import * as React from "react";
import styles from './ConsoleLog.module.scss';
import {generateRange} from "../helpers";

type ConsoleLog = {
    logMessages: string[];
};

const ConsoleLog = ({logMessages}: ConsoleLog) => {
    if (logMessages.length < 5) {
        logMessages = logMessages.concat(generateRange(4 - logMessages.length).map(() => ''));
    }

    return (
        <div className={styles.container}>
            {logMessages.map((message, index) => (
                <div
                    key={index}
                    className={styles.line}
                >
                    {message}
                </div>
            ))}
        </div>
    );
};

export default ConsoleLog;