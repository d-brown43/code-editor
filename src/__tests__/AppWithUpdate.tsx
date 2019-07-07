import {render, fireEvent} from "@testing-library/react";
import * as React from "react";

it('updates programs when callback called', () => {
    jest.isolateModules(() => {
        type CodeEditorMock = {
            setProgram: (program: string) => void;
            program: string;
        };

        const CodeEditorMock = ({setProgram, program}: CodeEditorMock) => (
            <>
                <div data-testid='rendered-program'>
                    {program}
                </div>
                <button
                    type='button'
                    onClick={() => setProgram('New Program')}
                >

                    <span>Click</span>
                </button>
            </>
        );

        jest.doMock('../CodeEditor', () => ({
            __esModule: true,
            default: CodeEditorMock
        }));

        const App = require('../App').default;

        const {getByText, getByTestId} = render(<App />);
        const button = getByText('Click');
        fireEvent.click(button);

        expect(getByTestId('rendered-program').innerHTML).toEqual('New Program');
    });
});