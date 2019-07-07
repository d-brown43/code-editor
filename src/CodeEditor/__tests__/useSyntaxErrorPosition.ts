import {renderHook} from "@testing-library/react-hooks";
import useSyntaxErrorPosition from "../useSyntaxErrorPosition";
import * as React from "react";
import {MutableRefObject} from "react";

it(`resets error state if no error`, () => {
    const setError = jest.fn();
    renderHook(() => {
        const textArea = React.useRef(null);
        useSyntaxErrorPosition(
            false,
            textArea,
            `console.log('Hello World');`,
            setError
        )
    });

    expect(setError).toHaveBeenCalledWith({
        x: 0,
        y: 0,
        error: null
    });
});

it(`does nothing if text area is null`, () => {
    const setError = jest.fn();
    renderHook(() => {
        const textArea = React.useRef(null);
        useSyntaxErrorPosition(
            {
                location: {
                    column: 10,
                    line: 3
                },
                message: 'Some error'
            },
            textArea,
            `console.log('Hello World');`,
            setError
        );
    });

    expect(setError).not.toHaveBeenCalled();
});

it(`sets position based on given program error location`, () => {
    const setError = jest.fn();
    renderHook(() => {
        const textareaCaretMock = jest.fn(() => ({
            top: 321,
            left: 41
        }));
        jest.doMock('textarea-caret', () => ({
            __esModule: true,
            default: textareaCaretMock
        }));
        const useSyntaxErrorPosition = require('../useSyntaxErrorPosition');

        const textArea = React.useRef<HTMLTextAreaElement>(null);
        (textArea as MutableRefObject<any>).current = {};
        useSyntaxErrorPosition(
            {
                location: {
                    column: 10,
                    line: 3
                },
                message: 'Some error'
            },
            textArea,
            `emsasd
            dm,amvma
            console.log('Hello World');`,
            setError
        );

        // Sum of all characters in the above text (including newlines)
        expect(textareaCaretMock).toHaveBeenCalledWith({}, 26);
        expect(setError).toHaveBeenCalledWith({
            x: 321,
            y: 41,
            error: 'Some Error'
        });
    });
});
