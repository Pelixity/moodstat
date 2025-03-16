export default function template(...args) {
    const imports = [
        "import type { SQLiteDatabase } from 'expo-sqlite';",
        "\n",
    ];
    const body = [
        'export default function migration(db: SQLiteDatabase) {',
        '\t',
        '}',
    ];

    return [...imports, ...body].join('\n');
};
