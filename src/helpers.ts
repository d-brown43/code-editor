export const generateRange = (highEnd: number, lowEnd: number = 1) => {
    let arr = [],
        c = highEnd + 1;
    while (c-- > lowEnd) {
        arr[c] = highEnd--
    }
    return arr;
};
