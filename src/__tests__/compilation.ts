import {compile, run} from "../compilation";

describe('compile', () => {
    it('can compile a simple program', () => {
        const program = `
            console.log('Hello World');
        `;
        compile(program);
    });
});

describe('run', () => {
    describe('replacing globals', () => {
        it('can run', () => {
            const program = `
                console.log('Hello World');
            `;

            const replacements = {
                console: {
                    log: jest.fn()
                }
            };

            run(program, replacements);
            expect(replacements.console.log).toHaveBeenCalled();
        });

        it('replaces all console statements', () => {
            const consoleLog = jest.spyOn(console, 'log');
            const consoleWarn = jest.spyOn(console, 'warn');
            const consoleError = jest.spyOn(console, 'error');

            const program = `
                console.log('Hello World');
                console.warn('Hello World');
                console.error('Hello World');
            `;

            const replacements = {
                console: {
                    log: jest.fn(),
                    warn: jest.fn(),
                    error: jest.fn()
                }
            };

            run(program, replacements);
            expect(consoleLog).not.toHaveBeenCalled();
            expect(consoleWarn).not.toHaveBeenCalled();
            expect(consoleError).not.toHaveBeenCalled();

            expect(replacements.console.log).toHaveBeenCalledWith('Hello World');
            expect(replacements.console.warn).toHaveBeenCalledWith('Hello World');
            expect(replacements.console.error).toHaveBeenCalledWith('Hello World');
        });
    });
});

describe('cleanup', () => {
    it(`doesn't leave extra properties in window after running`, () => {
        jest.spyOn(console, 'log').mockImplementationOnce(jest.fn());

        const program = `
            console.log('Hello World');
        `;
        const beforeLength = Object.keys(window).length;
        run(program);
        expect(Object.keys(window).length).toEqual(beforeLength);
    });
});
