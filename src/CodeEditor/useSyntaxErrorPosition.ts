import * as React from "react";
import getCaretCoordinates from "textarea-caret";
import {RefObject} from "react";

export default (
    programError: ProgramError,
    textArea: RefObject<HTMLTextAreaElement>,
    program: string,
    setError: (error: ErrorState) => void
) => {
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
    }, [program, programError, setError, textArea]);
};
