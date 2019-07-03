import * as React from "react";
import CodeEditorView from "../CodeEditorView";
import {shallow} from 'enzyme';

it('matches snapshot', () => {
    const program = `console.log('Hello World');`;
    const setProgram = jest.fn();

    const codeEditorView = shallow(
        <CodeEditorView
            program={program}
            setProgram={setProgram}
        />
    );
    expect(codeEditorView).toMatchSnapshot();
});
