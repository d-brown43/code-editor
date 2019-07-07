import * as React from "react";
import CodeEditorView from "../CodeEditorView";
import {shallow} from 'enzyme';

it('matches snapshot', () => {
    const program = `console.log('Hello World');`;
    const setProgram = jest.fn();

    const codeEditorView = shallow(
        <CodeEditorView
            programError={false}
            program={program}
            setProgram={setProgram}
        />
    );
    expect(codeEditorView).toMatchSnapshot();
});

it('matches snapshot', () => {
    const program = `console.log('Hello World');`;
    const setProgram = jest.fn();

    const codeEditorView = shallow(
        <CodeEditorView
            programError={{
                location: {
                    line: 10,
                    column: 1
                },
                message: 'Test Message'
            }}
            program={program}
            setProgram={setProgram}
        />
    );
    expect(codeEditorView).toMatchSnapshot();
});

it(`sets state to render a warning when there's a syntax error`, () => {

});
