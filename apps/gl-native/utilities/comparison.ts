type COMPARE_RESULT = -1 | 0 | 1;

export const min = (x: number, y: number): number => {
    return x <= y ? x : y;
};

export const compareNumber = (a: number, b: number): COMPARE_RESULT => {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
};
