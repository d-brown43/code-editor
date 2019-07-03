import * as React from 'react';
import CodeEditor from './CodeEditor';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.container}>
            <CodeEditor />
        </div>
    );
}

export default App;
