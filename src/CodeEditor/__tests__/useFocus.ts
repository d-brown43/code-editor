import {renderHook} from '@testing-library/react-hooks'
import useFocus from "../useFocus";

it('clears the value, focuses, then re-sets the value', async () => {
    const textArea: any = {
        current: {
            value: 'test',
            focus: jest.fn()
        }
    };

    const {rerender} = renderHook(() => useFocus(textArea));
    expect(textArea.current.value).toEqual('');
    expect(textArea.current.focus).toHaveBeenCalled();

    rerender();

    expect(textArea.current.value).toEqual('test');
});
