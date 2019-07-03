import * as React from "react";
import CodeEditorView from "../CodeEditorView";
import { shallow} from 'enzyme';

it('matches snapshot', () => {
    const codeEditorView = shallow(<CodeEditorView />);
    expect(codeEditorView).toMatchSnapshot();
});
