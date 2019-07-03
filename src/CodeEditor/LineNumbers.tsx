import {RefObject} from "react";
import * as React from "react";
import styles from './LineNumbers.module.scss';

type LineNumbers = {
    textArea: RefObject<HTMLTextAreaElement>;
};

const generateRange = (highEnd: number) => {
    let arr = [],
        c = highEnd + 1;
    while (c--) {
        arr[c] = highEnd--
    }
    return arr;
};

const LineNumbers = ({textArea}: LineNumbers) => {
    let lineCount = 0;
    if (textArea.current !== null) {
        lineCount = textArea.current.value.split('\n').length - 1;
    }

    return (
        <div className={styles.lineNumbers}>
            {generateRange(lineCount).map((index) => {
                return (
                    <span key={index}>{index}</span>
                )
            })}
        </div>
    );
};

export default LineNumbers;
