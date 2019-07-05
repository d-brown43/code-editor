import * as React from "react";
import styles from './ConsoleLog.module.scss';
import {generateRange} from "../helpers";

type ConsoleLog = {
    logMessages: any[];
};

const ConsoleLog = ({logMessages}: ConsoleLog) => {
    if (logMessages.length < 5) {
        logMessages = logMessages.concat(generateRange(4 - logMessages.length).map(() => ''));
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                {logMessages.map((message, index) => (
                    <div
                        key={index}
                        className={styles.line}
                    >
                        {(() => {
                            if (typeof message === 'string') {
                                return message;
                            }
                            return <pre className={styles.formattedMessage}>{JSON.stringify(message, null, 2)}</pre>;
                        })()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsoleLog;