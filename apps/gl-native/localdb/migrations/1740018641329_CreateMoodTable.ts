import type { SQLiteDatabase } from 'expo-sqlite';

export default function migration(db: SQLiteDatabase) {
    const createMoodRatingTable = `
        CREATE TABLE IF NOT EXISTS mood_rating (
            id INTEGER PRIMARY KEY NOT NULL,
            mood FLOAT,
            description TEXT,
            color VARCHAR(5),
            created_at TIMESTAMP DEFAULT (unixepoch())
        );
    `;
    return db.prepareAsync(createMoodRatingTable); 	
}
