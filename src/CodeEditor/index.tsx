import * as React from "react";
import CodeEditorView from './CodeEditorView';

type CodeEditor = {
    program: string;
    setProgram: (program: string) => void;
}

export default ({program, setProgram}: CodeEditor) => (
    <CodeEditorView
        program={program}
        setProgram={setProgram}
    />
);
