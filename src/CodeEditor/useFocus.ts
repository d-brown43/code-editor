import * as React from "react";
import {RefObject} from "react";

type FocusType = {
    isInitialised: boolean;
    intermediateCopy: string | undefined;
}

export default (textArea: RefObject<HTMLTextAreaElement>) => {
    const reducer = (state: FocusType, action: { type: string, payload?: any }) => {
        switch (action.type) {
            case 'value':
                return {
                    ...state,
                    intermediateCopy: action.payload
                };
            case 'initialised':
                return {
                    ...state,
                    isInitialised: true,
                    intermediateCopy: undefined
                };
            default:
                return state;
        }
    };

    const initialState: FocusType = {
        isInitialised: false,
        intermediateCopy: undefined
    };

    const [{
        isInitialised,
        intermediateCopy
    }, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        if (
            (textArea.current !== null)
            && !intermediateCopy
            && !isInitialised
        ) {
            textArea.current.focus();
            dispatch({type: 'value', payload: textArea.current.value});
            textArea.current.value = '';
        }
    }, [intermediateCopy, isInitialised, textArea]);

    React.useEffect(() => {
        if (
            (textArea.current !== null)
            && intermediateCopy
            && !isInitialised
        ) {
            dispatch({type: 'initialised'});
            textArea.current.value = intermediateCopy;
        }
    }, [isInitialised, intermediateCopy, textArea]);
};
