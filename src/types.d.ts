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
