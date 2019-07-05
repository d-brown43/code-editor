import * as React from "react";
import styles from './LineNumbers.module.scss';
import {generateRange} from "../helpers";

type LineNumbers = {
    program: string;
};

const LineNumbers = ({program}: LineNumbers) => {
    const lineCount = program.split('\n').length;

    return (
        <div className={styles.lineNumbers}>
            {generateRange(lineCount, 1).map((index) => {
                return (
                    <span key={index}>{index}</span>
                )
            })}
        </div>
    );
};

export default LineNumbers;
