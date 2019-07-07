interface CancellableScheduler {
    (...args: any): number;

    cancel: () => void;
}

const createCancellableScheduler = (schedule: (...args: any) => number, clearSchedule: (handle: number) => void) => (() => {
    let timers: number[] = [];

    return Object.assign(
        (...args: any) => {
            const timer = schedule.apply(null, args);
            timers.push(timer);
            return timer;
        },
        {
            cancel: () => {
                timers.forEach((timer) => {
                    clearSchedule(timer);
                });
                timers = [];
            }
        }
    );
})();


export const setTimeout: CancellableScheduler = createCancellableScheduler(window.setTimeout, window.clearTimeout);
export const setInterval: CancellableScheduler = createCancellableScheduler(window.setInterval, window.clearInterval);

export default (addLogMessage: LogWithType) => {
    const consoleReplace: ConsoleMock = {
        log: addLogMessage('log'),
        warn: addLogMessage('warn'),
        error: addLogMessage('error')
    };

    return {
        globalReplacements: {
            console: consoleReplace,
            setTimeout,
            setInterval,
        },
        cleanup: () => {
            setTimeout.cancel();
            setInterval.cancel();
        }
    }
}
