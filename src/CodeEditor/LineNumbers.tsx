import {RefObject} from "react";
import * as React from "react";
import styles from './LineNumbers.module.scss';
import {generateRange} from "../helpers";

type LineNumbers = {
    textArea: RefObject<HTMLTextAreaElement>;
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
