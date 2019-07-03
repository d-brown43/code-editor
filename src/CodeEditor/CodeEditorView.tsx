import * as React from "react";
import styles from './CodeEditor.module.scss';
import useTextAreaFocus from './useFocus';

type CodeEditorView = {
    program: string;
    setProgram: (program: string, callback?: (program: string) => void) => void;
}

export default React.memo(({program, setProgram}: CodeEditorView) => {
    const textArea = React.useRef<HTMLTextAreaElement>(null);

    useTextAreaFocus(textArea);

    return (
        <div className={styles.container}>
            <textarea
                ref={textArea}
                className={styles.textEditor}
                value={program}
                onChange={(e) => setProgram(e.target.value)}
            />
        </div>
    )
});
