import * as React from 'react';
import CodeEditor from './CodeEditor';
import styles from './App.module.scss';
import defaultProgram from "./defaultProgram";
import Controls from "./Controls";
import {compileForErrors, prepareWindow, run} from "./compilation";
import ConsoleLog from './ConsoleLog';
import useLogs from "./useLogs";
import useGlobalReplacements from "./useGlobalReplacements";

type Programs = {
    [key: string]: string;
}

type ProgramErrors = {
    [key: string]: ProgramError;
}

const App = () => {
    const [activeProgram, setActiveProgram] = React.useState<string>('index');
    const [logs, addLogMessage] = useLogs();
    const [programs, setPrograms] = React.useState<Programs>({
        index: defaultProgram()
    });
    const [programErrors, setProgramErrors] = React.useState<ProgramErrors>({});
    const {globalReplacements, cleanup} = useGlobalReplacements(addLogMessage);

    React.useEffect(() => {
        prepareWindow(globalReplacements);
    }, [globalReplacements]);

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
                        cleanup();
                        run(programs.index, globalReplacements);
                    } catch (e) {
                        addLogMessage('error')(e.message.replace(/__codeEditor__\./g, ''));
                    }
                }}
                stop={cleanup}
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
