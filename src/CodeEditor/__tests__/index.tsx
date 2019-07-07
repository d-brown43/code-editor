import CodeEditor from "../index";
import {shallow} from "enzyme";
import * as React from "react";

it('matches snapshot', () => {
    const codeEditor = shallow(
        <CodeEditor
            program={`console.log('Hello world');`}
            setProgram={jest.fn()}
            programError={false}
        />
    );
    expect(codeEditor).toMatchSnapshot();
});
