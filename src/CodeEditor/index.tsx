import * as React from "react";
import CodeEditorView from './CodeEditorView';

type CodeEditor = {
    program: string;
    setProgram: (program: string) => void;
    programError: ProgramError;
}

export default ({program, setProgram, programError}: CodeEditor) => (
    <CodeEditorView
        program={program}
        setProgram={setProgram}
        programError={programError}
    />
);
