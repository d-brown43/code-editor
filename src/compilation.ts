import {parse} from '@babel/parser';
import traverse, {NodePath} from '@babel/traverse';
import generate from '@babel/generator';
import * as babel from '@babel/core';
import * as t from '@babel/types';
import {File, MemberExpression} from '@babel/types';
import babelPresetEnv from '@babel/preset-env';

const WINDOW_PROPERTY_NAME = '__codeEditor__';

export const prepareWindow = (globalReplacements: GlobalReplacements = {}) => {
    (window as any)[WINDOW_PROPERTY_NAME] = globalReplacements;
};

const replaceGlobal = (ast: File, globalReplacements: GlobalReplacements = {}) => {
    const visitor = {
        MemberExpression: (path: NodePath<MemberExpression>) => {
            if (
                (path.node.object.type === 'Identifier')
                && ['window', 'global'].includes(path.node.object.name)
                && (path.node.property.type === 'Identifier')
                && Object.keys(globalReplacements).includes(path.node.property.name)
            ) {
                path.replaceWith(t.memberExpression(
                    t.identifier(WINDOW_PROPERTY_NAME),
                    t.identifier(path.node.property.name)
                ));
            } else if (
                (path.node.object.type === 'Identifier')
                && Object.keys(globalReplacements).includes(path.node.object.name)
                && (path.parent.type === 'CallExpression')
            ) {
                // Replace something like console with [WINDOW_PROPERTY_NAME].console
                path.replaceWith(t.memberExpression(
                    t.memberExpression(
                        t.identifier(WINDOW_PROPERTY_NAME),
                        t.identifier(path.node.object.name)
                    ),
                    t.identifier(path.node.property.name)
                ));
            }
        }
    };

    traverse(ast, visitor);

    return ast;
};

export const compileForErrors = (program: string): ProgramError => {
    try {
        parse(program);
        return false;
    } catch (e) {
        return {
            location: {
                column: e.loc.column,
                line: e.loc.line
            },
            message: e.message
        };
    }
};

export const run = (program: string, globalReplacements?: GlobalReplacements) => {
    const ast = parse(program);

    const astReplaced = replaceGlobal(ast, globalReplacements);
    const finalProgram = babel.transformSync(generate(astReplaced).code, {
        presets: [babelPresetEnv]
    });

    if (finalProgram) {
        // eslint-disable-next-line no-eval
        eval(finalProgram.code as string);
    }
};
