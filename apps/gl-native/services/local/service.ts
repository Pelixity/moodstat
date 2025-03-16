import type { SQLiteDatabase } from 'expo-sqlite';
import type { MoodDetail } from '@/types/Mood';
import type { Calendar } from '@/types/Calendar';
import { getHueFromRating } from '@/utilities/colors';
import { getStartAndEndOfMonth, createCalendarStructure } from '@/utilities/date-time';

export type CreateMoodResponse = MoodDetail & {
    id: number;
};

export type MonthlyMoodSummaryResponse = {
    calendar: Calendar;
};

export interface MoodResponse<ResponseType> {
    error: string[] | undefined;
    data: ResponseType | Record<string, never>; 
};

// TODO: add some sort of middleware to perform validations
// auth or whatever else might be needed. Abstract it away
// TODO: refactor this since prepared statements are not
// the recommended way for some reason (see transactions)
export default class LocalMoodService {
    _db: SQLiteDatabase | undefined = undefined;

    constructor(db: SQLiteDatabase) {
        this._db = db;
    }

    async createMoodRating(rating: number, description: string): MoodResponse<CreateMoodResponse> {
        const color = getHueFromRating(rating);
        const fixedMoodRating = Number(rating.toFixed(1));
        const statement = `
            INSERT INTO mood_rating (
                mood,
                description,
                color
            ) VALUES(
                $mood,
                $description,
                $color
            );
        `;

        // TODO: make sure response is following the expected type. Currently,
        // it's the default expo SQLite response which with methods to get
        // last inserted row
        let response: MoodResponse<CreateMoodResponse>;
        const createRating = await this._db.prepareAsync(statement);
        try {
            const data = await createRating.executeAsync({
                $mood: fixedMoodRating,
                $description: description,
                $color: color,
            }) as CreateMoodResponse; 
            response = { data, error: null };
        } catch (err) {
            response = { data: {}, error: [`Failed to create rating: ${err.message}`] }; 
        } finally {
            await createRating.finalizeAsync();
        }
        return response;
    }

    async getMoodRatingForDay(date: Date) {
        const startTime = new Date(date); 
        const endTime = new Date(date);
        startTime.setHours(0);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        endTime.setHours(23);
        endTime.setMinutes(59);
        endTime.setSeconds(59);
        const summaryQuery = `
            SELECT
                id,
                mood,
                color,
                description,
                created_at
            FROM mood_rating
            WHERE created_at >= $startTime AND created_at <= $endTime;
        `; 

        let response: MoodResponse<(MoodDetail & { id: number })[]>; 
        const summaryStatement = await this._db.prepareAsync(summaryQuery);
        try {
            // divide by 1000 to get rid of milliseconds since SQLite
            // only goes down to seconds for unix_epoch. Might need parseInt?
            const data = await summaryStatement.executeAsync({
                $startTime: startTime.getTime() / 1000,
                $endTime: endTime.getTime() / 1000,
            });
            const logsForDay = await data.getAllAsync();
            response = { data: { logsForDay }, error: null };
        } catch (err) {
            response = { error: [err], data: {} };
        } finally {
            await summaryStatement.finalizeAsync();
        }
        return response;
    }

    async getMonthlyMoodSummary(month: number, year: number) {
        const { startTime, endTime } = getStartAndEndOfMonth(month, year);
        const summaryQuery = `
            SELECT
                id,
                mood,
                color,
                created_at
            FROM mood_rating
            WHERE created_at >= $startTime AND created_at <= $endTime;
        `; 

        let response: MoodResponse<MonthlyMoodSummaryResponse>; 
        const summaryStatement = await this._db.prepareAsync(summaryQuery);
        try {
            // divide by 1000 to get rid of milliseconds since SQLite
            // only goes down to seconds for unix_epoch. Might need parseInt?
            const data = await summaryStatement.executeAsync({
                $startTime: startTime.getTime() / 1000,
                $endTime: endTime.getTime() / 1000,
            });
            const logsForMonth = await data.getAllAsync();
            const calendarData = createCalendarStructure(month, year, logsForMonth);
            response = { data: { calendarData }, error: null };
        } catch (err) {
            response = { error: [err], data: {} };
        } finally {
            await summaryStatement.finalizeAsync();
        }
        return response;
    }
};
