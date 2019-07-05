import * as React from "react";
import styles from "./ConsoleLog.module.scss";

type ConsoleMessageView = {
    message: any;
    type?: ConsoleMessageType;
}

const ConsoleMessage = ({message, type = 'log'}: ConsoleMessageView) => {
    const formattedMessage = React.useMemo(() => (
        <pre className={`${styles.formattedMessage} ${styles[type]}`}>
            {JSON.stringify(message, null, 2)}
        </pre>
    ), [message, type]);
    if (typeof message === 'string') {
        return <span className={`${styles[type]} ${styles.formattedMessage}`}>{message}</span>;
    }
    return formattedMessage;
};

export default ConsoleMessage;