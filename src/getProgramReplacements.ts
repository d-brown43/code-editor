type ConsoleMock = {
    log: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
}

export default (logger: ConsoleMock) => {
    return {
        console: {
            log: logger.log,
            warn: logger.warn,
            error: logger.error
        }
    };
};
