import type { Calendar, DateComponentLabel } from '@/types/Calendar';
import type { MoodDetail } from '@/types/Mood';
import { min } from '@/utilities/comparison';
import { isEmptyArray } from '@/utilities/collection';
import { getHueFromRating } from '@/utilities/colors';
import { computeAverageMoodFromLogs } from '@/utilities/mood'; 
import { DAYS_PER_MONTH, LEAP_YEAR_DAYS_PER_MONTH, MILLISECONDS_IN_DAY } from '@/constants/DateTime';

export const isLeapYear = (year: number): bool => {
    if (year % 100 === 0) {
        return year % 400 === 0;
    }
    return year % 4 === 0;
};

export const getDateComponents = (date: Date, componentList: DateComponentLabel[]): string => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const components = formatter
        .formatToParts(date)
        .filter(part => componentList.includes(part.type))
        .map(part => part.value);
    return components.join(' ');
};

export const getMonthAndDay = (date: Date): string => {
    const options = { month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const monthAndDay = formatter
        .formatToParts(date)
        .filter(part => part.type === 'month' || part.type === 'day')
        .map(part => part.value);
    return monthAndDay.join(" ");
};

export const getMonth = (date: Date): string => {
    const options = { month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    const monthAndDay = formatter
        .formatToParts(date)
        .filter(part => part.type === 'month') 
        .map(part => part.value);
    return monthAndDay.join(" ");
};

export const addMoodLogsToCalendar = (structure: Calendar, logs: MoodDetail[]): Calendar => {
    return Object.entries(structure).reduce(
        (memo, [weekNumber, days]) => {
            const daysWithLogItems = days.map(day => {
                const relatedLogs = logs.filter(log => {
                    const createdAtWithMilliSec = log.created_at * 1000;
                    return createdAtWithMilliSec >= day.timestampStart && createdAtWithMilliSec <= day.timestampEnd;
                });
                const averageMood = computeAverageMoodFromLogs(relatedLogs);
                const color = getHueFromRating(averageMood); 
                return { ...day, mood: { averageMood, color } };
            }); 
            memo[weekNumber] = daysWithLogItems;
            return memo;
        },
        {}
    );
};

export const createCalendarStructure = (month: number, year: number, logs: MoodDetail[] = []): Calendar => {
    const today = new Date();
    const monthBeginning = new Date(year, month);
    const totalDays = !isLeapYear(year) ? DAYS_PER_MONTH[month] : LEAP_YEAR_DAYS_PER_MONTH[month];
    const startDay = monthBeginning.getDay();
    const numberOfWeeks = Math.ceil((startDay + totalDays) / 7);
    const calendar = {};
    let numberDaysUsed = 0;
    for (let i = 0; i < numberOfWeeks; i++) {
        const startIndex = i !== 0 ? 0 : startDay; 
        const maxDays = min(7 - startIndex, totalDays - numberDaysUsed);
        const days = [];
        for (let j = 0; j < maxDays; j++) {
            numberDaysUsed += 1;
            monthBeginning.setDate(numberDaysUsed);
            const timestampStart = monthBeginning.getTime();
            const timestampEnd = timestampStart + MILLISECONDS_IN_DAY - 1;
            const day = {
                dayNumber: numberDaysUsed,
                timestampStart,
                timestampEnd,
                ...(today.getFullYear() === year && today.getMonth() === month && today.getDate() === numberDaysUsed && { isToday: true }),
            };
            days.push(day)
        }

        calendar[i] = days;
    }
    if (!isEmptyArray(logs)) {
        return addMoodLogsToCalendar(calendar, logs);
    }
    return calendar;
};

export function getStartAndEndOfMonth(month: number, year: number): { startTime: Date, endTime: Date } {
    const maxDays = !isLeapYear(year) ? DAYS_PER_MONTH[month] : LEAP_YEAR_DAYS_PER_MONTH[month];
    const startTime = new Date(year, month);
    startTime.setDate(1);
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date(year, month);
    endTime.setDate(maxDays);
    endTime.setHours(23, 59, 59, 999);
    return {
        startTime,
        endTime, 
    };
}
