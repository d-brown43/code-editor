import {act, renderHook} from "@testing-library/react-hooks";
import useLogs from "../useLogs";

it('returns empty logs initially', () => {
    renderHook(() => {
        const [logs] = useLogs();
        expect(logs).toEqual([]);
    });
});

it('returns new logs when log added', () => {
    const {result} = renderHook(() => useLogs());
    act(() => {
        result.current[1]('log')('Hello World');
    });

    expect(result.current[0]).toEqual([{
        type: 'log',
        message: 'Hello World'
    }]);
});

it('lets you add multiple messages sequentially', () => {
    const {result} = renderHook(() => useLogs());
    act(() => {
        result.current[1]('log')('Hello World');
        result.current[1]('warn')('Warning');
        result.current[1]('error')('Error');
    });

    expect(result.current[0]).toEqual([
        {
            type: 'log',
            message: 'Hello World'
        },
        {
            type: 'warn',
            message: 'Warning',
        },
        {
            type: 'error',
            message: 'Error'
        }
    ]);
});
