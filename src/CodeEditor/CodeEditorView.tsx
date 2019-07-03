import * as React from "react";
import styles from './CodeEditor.module.scss';

export default () => {
    return (
        <div className={styles.container}>
            <textarea className={styles.textEditor} />
        </div>
    )
};
