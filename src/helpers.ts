export const generateRange = (highEnd: number, lowEnd: number = 1) => {
    const arr = [];
    for (let i = lowEnd; i <= highEnd; i++) {
        arr.push(i);
    }
    return arr;
};
