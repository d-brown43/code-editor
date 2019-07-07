import * as React from "react";
import styles from './CodeEditor.module.scss';
import useTextAreaFocus from './useFocus';
import LineNumbers from "./LineNumbers";
import useSyntaxErrorPosition from "./useSyntaxErrorPosition";

type CodeEditorView = {
    program: string;
    setProgram: (program: string, callback?: (program: string) => void) => void;
    programError: ProgramError;
}

export default React.memo(({program, setProgram, programError}: CodeEditorView) => {
    const textArea = React.useRef<HTMLTextAreaElement>(null);
    const [error, setError] = React.useState<ErrorState>({
        x: 0,
        y: 0,
        error: null
    });

    useTextAreaFocus(textArea);
    useSyntaxErrorPosition(programError, textArea, program, setError);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {(error.error === null) ? null : (
                    <span
                        style={{
                            position: 'absolute',
                            top: `calc(${error.y}px + 1em)`,
                            left: error.x,
                            color: 'red'
                        }}
                    >
                        <i className="fas fa-chevron-up" />
                        <span style={{marginLeft: 8}}>
                            {error.error}
                        </span>
                    </span>
                )}
                <LineNumbers program={program} />
                <textarea
                    ref={textArea}
                    className={styles.textEditor}
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                />
            </div>
        </div>
    )
});
