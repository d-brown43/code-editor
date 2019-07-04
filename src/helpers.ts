export const generateRange = (highEnd: number) => {
    let arr = [],
        c = highEnd + 1;
    while (c--) {
        arr[c] = highEnd--
    }
    return arr;
};
