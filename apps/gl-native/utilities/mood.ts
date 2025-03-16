import type { MoodDetail } from '@/types/Mood';
import { isEmptyArray } from '@/utilities/collection';

export const computeAverageMoodFromLogs = (logs: MoodDetail[]): number => {
    if (isEmptyArray(logs)) {
        return 0;
    }
    const totalRating = logs.reduce((total, log) => total + log!.mood, 0);
    return Number((totalRating / logs.length).toFixed(1));
};
