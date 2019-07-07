import {compileForErrors, prepareWindow, run} from "../compilation";

describe('run', () => {
    it('can run', () => {
        const program = `
            console.log('Hello World');
        `;

        const replacements = {
            console: {
                log: jest.fn()
            }
        };

        prepareWindow(replacements);
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

        prepareWindow(replacements);
        run(program, replacements);
        expect(consoleLog).not.toHaveBeenCalled();
        expect(consoleWarn).not.toHaveBeenCalled();
        expect(consoleError).not.toHaveBeenCalled();

        expect(replacements.console.log).toHaveBeenCalledWith('Hello World');
        expect(replacements.console.warn).toHaveBeenCalledWith('Hello World');
        expect(replacements.console.error).toHaveBeenCalledWith('Hello World');
    });

    it('works for explicit global statements', () => {
        const replacements = {
            console: {
                log: jest.fn()
            }
        };

        const program = `
            window.console.log('Hi');
        `;

        prepareWindow(replacements);
        run(program, replacements);

        expect(replacements.console.log).toHaveBeenCalledWith('Hi');
    });

    it('works for global too, not just window', () => {
        const program = `
            global.console.log('Hi');
        `;

        const replacements = {
            console: {
                log: jest.fn()
            }
        };

        prepareWindow(replacements);
        run(program, replacements);

        expect(replacements.console.log).toHaveBeenCalledWith('Hi');
    });
});

describe('compileForErrors', () => {
    it(`returns false when there's no syntax errors`, () => {
        const program = `
            console.log('Hello');
        `;
        expect(compileForErrors(program)).toEqual(false);
    });

    it(`returns a ProgramError when there's a syntax error`, () => {
        const program = `console.log('This doesn't work`;
        expect(compileForErrors(program)).not.toEqual(false);
        expect(compileForErrors(program)).toHaveProperty('location');
        expect(compileForErrors(program)).toHaveProperty('message');
    });
});
