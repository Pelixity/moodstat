export function getHSLFromRating(rating: number): string {
    const hue = getHueFromRating(rating);
    return `hsl(${hue}, 64%, 52%)`;
}

export function getHueFromRating(rating: number): string {
    const hueRange = [0, 140];
    const colorScale = (hueRange[1] - hueRange[0]) / 10;
    const hue = parseInt(rating * colorScale, 10);
    return hue.toString(); 
}
