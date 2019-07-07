import {generateRange} from "../helpers";

describe('generateRange', () => {
    it('generates integer array in a given range', () => {
        expect(generateRange(10)).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10
        ]);
    });

    it('generates integer array starting at given low going up to and including high', () => {
        expect(generateRange(8, 5)).toEqual([
            5, 6, 7, 8
        ]);
    });

    it('returns empty array if low larger than high', () => {
        expect(generateRange(6, 10)).toEqual([]);
    });

    it('returns array with single element if low equal to high', () => {
        expect(generateRange(8, 8)).toEqual([8]);
    });
});
