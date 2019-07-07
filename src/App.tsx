import * as React from 'react';
import CodeEditor from './CodeEditor';
import styles from './App.module.scss';
import defaultProgram from "./defaultProgram";
import Controls from "./Controls";
import {compileForErrors, prepareWindow, run} from "./compilation";
import getProgramReplacements from './getProgramReplacements';
import ConsoleLog from './ConsoleLog';

type Programs = {
    [key: string]: string;
}

type ProgramErrors = {
    [key: string]: ProgramError;
}

const App = () => {
    const [activeProgram, setActiveProgram] = React.useState<string>('index');

    const [programs, setPrograms] = React.useState<Programs>({
        index: defaultProgram()
    });

    const [programErrors, setProgramErrors] = React.useState<ProgramErrors>({});

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

    React.useEffect(() => {
        setProgramErrors(Object.entries(programs).reduce((result, [programKey, program]) => ({
            ...result,
            [programKey]: compileForErrors(program)
        }), {}));
    }, [programs]);

    return (
        <div className={styles.container}>
            <Controls
                run={() => {
                    try {
                        run(programs.index, programReplacements);
                    } catch (e) {
                        console.error(e);
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
                        programError={programErrors[activeProgram]}
                    />
                ))
            }
            <ConsoleLog logMessages={logs} />
        </div>
    );
};

export default App;
