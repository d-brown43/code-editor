import * as React from "react";

export default (): UseLogReturn => {
    const [logs, setLogs] = React.useState<ConsoleMessage[]>([]);

    const addLogMessage = (type: ConsoleMessageType): ((message: string) => void) => {
        return (message: string): void => {
            setLogs((prevLogs) => [
                ...prevLogs,
                {
                    message,
                    type
                }
            ]);
        };
    };

    return [logs, addLogMessage];
};
