export default (addLogMessage: LogWithType): GlobalReplacements => {
    const consoleReplace: ConsoleMock = {
        log: addLogMessage('log'),
        warn: addLogMessage('warn'),
        error: addLogMessage('error')
    };

    return {
        console: consoleReplace
    }
};
