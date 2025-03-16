import type { SQLiteDatabase } from 'expo-sqlite';
import * as migrations from './migrations';

const CREATE_VERSION_TABLE = `
    CREATE TABLE IF NOT EXISTS versions(
        id INTEGER PRIMARY KEY NOT NULL,
        version_name VARCHAR(50)
    );
`;

interface VersionTable {
    id: number;
    version_name: string;
};


function getVersionDiff(versions: SQLiteExecuteAsyncResult<VersionTable>) {
    const latest = versions.sort();
}

async function runMigrations(currentVersion: string | null, db: SQLiteDatabase) {
    const migrationStatements = [];

    if (currentVersion === 0) {
        
    }
}

// TODO: dynamically determine version and perform migrations
export async function migrate(db: SQLiteDatabase) {
    const { user_version: currentVersion } = await db.getFirstAsync('PRAGMA user_version');
    if (currentVersion === 1) {
        return;
    }

    const statements = [];
    statements.push([db.prepareAsync(CREATE_VERSION_TABLE), []]);
    statements.push([migrations.CreateMoodTable(db), []]);
    statements.push([db.prepareAsync('PRAGMA user_version = 1'), []]);
    const preparedStatements = await Promise.all(statements.map(query => query[0]));
    const executedStatements = preparedStatements.map((query, idx) => {
        return query?.executeAsync(statements[idx][1]);
    });
    const finalStatements = await Promise.all(executedStatements);
    await Promise.all(finalStatements => statement.finalizeAsync());
}
