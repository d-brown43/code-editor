import * as React from 'react';
import CodeEditor from './CodeEditor';
import styles from './App.module.scss';
import defaultProgram from "./defaultProgram";
import Controls from "./Controls";
import {prepareWindow, run} from "./compilation";
import getProgramReplacements from './getProgramReplacements';
import ConsoleLog from './ConsoleLog';

type Programs = {
    [key: string]: string;
}

const App = () => {
    const [programs, setPrograms] = React.useState<Programs>({
        index: defaultProgram()
    });

    const [logs, setLogs] = React.useState<ConsoleMessage[]>([]);

    const logMessage = (type: ConsoleMessageType) => (message: string) => {
        setLogs((prevLogs) => [
            ...prevLogs,
            {
                message,
                type
            }
        ]);
    };

    const consoleReplace = {
        log: logMessage('log'),
        warn: logMessage('warn'),
        error: logMessage('error')
    };

    const programReplacements = React.useMemo(() => getProgramReplacements(consoleReplace), [consoleReplace]);

    React.useEffect(() => {
        prepareWindow(programReplacements);
    }, [programReplacements]);

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
                    try {
                        run(programs.index, programReplacements);
                    } catch {
                        // Ignore
                    }
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
