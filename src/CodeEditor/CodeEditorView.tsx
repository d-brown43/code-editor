import * as React from "react";
import styles from './CodeEditor.module.scss';
import useTextAreaFocus from './useFocus';
import LineNumbers from "./LineNumbers";
import getCaretCoordinates from 'textarea-caret';

type CodeEditorView = {
    program: string;
    setProgram: (program: string, callback?: (program: string) => void) => void;
    programError: ProgramError;
}

type ErrorState = {
    x: number;
    y: number;
    error: null | string;
}

export default React.memo(({program, setProgram, programError}: CodeEditorView) => {
    const textArea = React.useRef<HTMLTextAreaElement>(null);
    const [error, setError] = React.useState<ErrorState>({
        x: 0,
        y: 0,
        error: null
    });

    React.useEffect(() => {
        if (programError && (textArea.current !== null)) {
            const offset = program.split('\n')
                .filter((ele, index) => index < programError.location.line - 1)
                .reduce((result, line) => (result + 1 + line.length), 0) + programError.location.column;

            const {top, left} = getCaretCoordinates(textArea.current, offset);

            setError({
                x: left,
                y: top,
                error: programError.message
            })
        } else if (!programError) {
            setError({
                x: 0,
                y: 0,
                error: null
            });
        }
    }, [program, programError]);


    useTextAreaFocus(textArea);

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
