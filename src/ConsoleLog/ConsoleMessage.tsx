import * as React from "react";
import styles from "./ConsoleLog.module.scss";


type ConsoleMessage = {
    message: any;
}

const ConsoleMessage = ({message}: ConsoleMessage) => {
    const formattedMessage = React.useMemo(() => (
        <pre className={styles.formattedMessage}>
            {JSON.stringify(message, null, 2)}
        </pre>
    ), [message]);
    if (typeof message === 'string') {
        return <span>{message}</span>;
    }
    return formattedMessage;
};

export default ConsoleMessage;