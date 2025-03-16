export const isEmptyObject = (collection: Record<any, any>): boolean => {
    return Object.keys(collection).length === 0;
};

export const isEmptyArray = (arrayLike: any[]): boolean => {
    return arrayLike.length === 0;
};
