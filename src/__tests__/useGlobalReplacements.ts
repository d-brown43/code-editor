import {unwatchFile} from "fs";

describe('timers', () => {
    it('resets timeouts', async () => {
        await new Promise((resolve) => {
            jest.isolateModules(() => {
                const timeoutTask = jest.fn();

                const useGlobalReplacements = require('../useGlobalReplacements').default;

                const {globalReplacements, cleanup} = useGlobalReplacements(jest.fn());

                expect(globalReplacements.setTimeout).toHaveProperty('cancel');

                globalReplacements.setTimeout(timeoutTask);

                cleanup();

                setTimeout(() => {
                    expect(timeoutTask).not.toHaveBeenCalled();
                    resolve();
                });
            });
        });
    });

    it('resets intervals', async () => {
        await new Promise((resolve) => {
            jest.isolateModules(() => {
                const intervalTask = jest.fn();

                const useGlobalReplacemenst = require('../useGlobalReplacements').default;

                const {globalReplacements, cleanup} = useGlobalReplacemenst(jest.fn());

                expect(globalReplacements.setInterval).toHaveProperty('cancel');

                globalReplacements.setInterval(intervalTask);

                cleanup();

                const unwatch = setInterval(() => {
                    expect(intervalTask).not.toHaveBeenCalled();
                    clearInterval(unwatch);
                    resolve();
                });
            });
        });
    });

    it('calls setTimeouts in the same way as an unpatched setTimeout', async () => {
        await new Promise((resolve) => {
            jest.isolateModules(() => {
                const timeoutTask = jest.fn();

                const useGlobalReplacements = require('../useGlobalReplacements').default;

                const {globalReplacements} = useGlobalReplacements(jest.fn());

                globalReplacements.setTimeout(timeoutTask);

                setTimeout(() => {
                    expect(timeoutTask).toHaveBeenCalled();
                    resolve();
                });
            });
        });
    });
});

// Required for module mode
export default undefined;
