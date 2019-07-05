type ConsoleMessageType = 'error' | 'warn' | 'log';

type ConsoleMessage = {
    message: string;
    type: ConsoleMessageType;
}
