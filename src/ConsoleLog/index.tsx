import * as React from "react";
import styles from './ConsoleLog.module.scss';
import ConsoleMessage from "./ConsoleMessage";
import ReactResizeDetector from 'react-resize-detector';

type ConsoleLog = {
    logMessages: any[];
};

const ConsoleLog = ({logMessages}: ConsoleLog) => {
    const [height, setHeight] = React.useState(0);
    const wrapper = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (wrapper.current !== null) {
            wrapper.current.scrollTop = height - wrapper.current.offsetHeight;
        }
    }, [height]);

    return (
        <div
            className={styles.wrapper}
            ref={wrapper}
        >
            <div className={styles.container}>
                <ReactResizeDetector
                    handleHeight
                    onResize={(width, height) => {
                        setHeight(height);
                    }}
                />
                {logMessages.map((message, index) => (
                    <div
                        key={index}
                        className={styles.line}
                    >
                        <ConsoleMessage
                            message={message}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ConsoleLog;