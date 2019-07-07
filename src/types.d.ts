type ConsoleMessageType = 'error' | 'warn' | 'log';

type ConsoleMessage = {
    message: string;
    type: ConsoleMessageType;
}

type ProgramError = false | {
    message: string;
    location: {
        line: number;
        column: number;
    }
}

type ConsoleMock = {
    log: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
}

type LogWithType = (type: ConsoleMessageType) => (message: string) => void;
type UseLogReturn = [ConsoleMessage[], LogWithType];

type GlobalReplacements = undefined | {
    [key: string]: any;
}

type ErrorState = {
    x: number;
    y: number;
    error: null | string;
}
