import * as React from "react";
import styles from "./ConsoleLog.module.scss";


type ConsoleMessage = {
    message: any;
}

const ConsoleMessage = React.memo(({message}: ConsoleMessage) => {
    return (
        <pre className={styles.formattedMessage}>
            {JSON.stringify(message, null, 2)}
        </pre>
    );
});

export default ConsoleMessage;