import * as React from 'react';
import CodeEditor from './CodeEditor';
import styles from './App.module.scss';
import defaultProgram from "./defaultProgram";

type Programs = {
    [key: string]: string;
}

const App = () => {
    const [programs, setPrograms] = React.useState<Programs>({
        index: defaultProgram()
    });

    const setProgramGenerator = (key: string) => (program: string) => {
        setPrograms((prevPrograms) => ({
            ...prevPrograms,
            [key]: program
        }))
    };

    return (
        <div className={styles.container}>
            {
                Object.entries(programs).map(([filename, program]) => (
                    <CodeEditor
                        key={filename}
                        program={program}
                        setProgram={setProgramGenerator(filename)}
                    />
                ))
            }
        </div>
    );
};

export default App;
