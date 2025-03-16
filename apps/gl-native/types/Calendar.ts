import type { MoodSummary } from '@/types/Mood';

export type CalendarItem = {
    dayNumber: number;
    mood?: MoodSummary; 
    isToday?: boolean;
}

export type Calendar = {
    [weekKey: number]: CalendarItem[];
}

export type DateComponentLabel = 'day' | 'month' | 'year';
