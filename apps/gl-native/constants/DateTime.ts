export const DAYS_PER_MONTH = {
    0: 31,
    1: 28,
    2: 31,
    3: 30,
    4: 31,
    5: 30,
    6: 31,
    7: 31,
    8: 30,
    9: 31,
    10: 30,
    11: 31,
};

export const LEAP_YEAR_DAYS_PER_MONTH = {
    ...DAYS_PER_MONTH,
    1: 29,
}

export const SECONDS_IN_DAY = 86400;

export const MILLISECONDS_IN_DAY = SECONDS_IN_DAY * 1000;

export const WEEK_DAY_ABBREVIATIONS = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
];
