import * as React from 'react';
import CodeEditor from './CodeEditor';
import styles from './App.module.scss';
import defaultProgram from "./defaultProgram";
import Controls from "./Controls";
import {run} from "./compilation";
import getProgramReplacements from './getProgramReplacements';
import ConsoleLog from './ConsoleLog';

type Programs = {
    [key: string]: string;
}

const App = () => {
    const [programs, setPrograms] = React.useState<Programs>({
        index: defaultProgram()
    });

    const [logs, setLogs] = React.useState<string[]>([]);

    const logMessage = (message: string) => {
        setLogs((prevLogs) => [
            ...prevLogs,
            message
        ]);
    };

    const console = {
        log: logMessage,
        warn: logMessage,
        error: logMessage
    };

    const programReplacements = React.useMemo(() => getProgramReplacements(console), [console]);

    const setProgramGenerator = (key: string) => (program: string) => {
        setPrograms((prevPrograms) => ({
            ...prevPrograms,
            [key]: program
        }))
    };

    return (
        <div className={styles.container}>
            <Controls
                run={() => {
                    run(programs.index, programReplacements);
                }}
            />
            {
                Object.entries(programs).map(([filename, program]) => (
                    <CodeEditor
                        key={filename}
                        program={program}
                        setProgram={setProgramGenerator(filename)}
                    />
                ))
            }
            <ConsoleLog logMessages={logs} />
        </div>
    );
};

export default App;
