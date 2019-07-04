import {parse} from '@babel/parser';
import traverse, {NodePath} from '@babel/traverse';
import generate from '@babel/generator';
import * as t from '@babel/types';
import {File, Identifier} from '@babel/types';

export const compile = (program: string) => {
    return parse(program, {
        sourceType: "unambiguous",
        // ranges: true
    });
};

type GlobalReplacements = {
    [key: string]: any;
}

const computeWindowPropertyName = (property: string) => {
    return `__codeEditor__${property}`;
};

const replaceGlobal = (ast: File, globalReplacements: GlobalReplacements) => {
    const visitor = {
        Identifier: (path: NodePath<Identifier>) => {
            if (
                Object.keys(globalReplacements).includes(path.node.name)
            ) {
                path.replaceWith(t.identifier(computeWindowPropertyName(path.node.name)));
            }
        }
    };

    traverse(ast, visitor);

    return ast;
};

const addPropsToWindow = (globalReplacements: GlobalReplacements) => {
    Object.entries(globalReplacements).forEach(([key, value]) => {
        if (!(key in window)) {
            throw new Error(`key: ${key} is not a valid window property`);
        }
        (window as any)[computeWindowPropertyName(key)] = value;
    });
};

export const run = (program: string, globalReplacements: GlobalReplacements) => {
    const ast = parse(program);

    const astReplaced = replaceGlobal(ast, globalReplacements);
    const finalProgram = generate(astReplaced).code;

    addPropsToWindow(globalReplacements);
    // eslint-disable-next-line no-eval
    eval(finalProgram);
};
