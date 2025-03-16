#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import * as templates from './templates/index.js';

function exit(code) {
    return process.exit(code);
}

function createMigration(migrationName, pathPrefix = './localdb/migrations') {
    const timestamp = (new Date()).getTime();
    const migrationFilename = `${timestamp}_${migrationName}.ts`;
    const migrationFile = path.join(process.cwd(), pathPrefix, migrationFilename);
    if (fs.existsSync(migrationFile)) {
        console.error(`Filename ${migrationFilename} already exists`);
        exit(1);
    }
    const file = fs.openSync(migrationFile, 'w');
    const migrationFileData = templates['create']({});
    fs.writeFileSync(file, migrationFileData);
    fs.closeSync(file);
    const indexFile = fs.openSync(path.join(process.cwd(), pathPrefix, './index.ts'), 'a+');
    fs.appendFileSync(indexFile, `export { default as ${migrationName} } from './${migrationFilename}';\n`);
    fs.closeSync(indexFile);
    console.log('Successfully created migration', migrationFilename);
}

function run() {
    const commandMap = {
        create: createMigration,
    };
    const argMap = {
        create: ['<name>'],
    };

    const args = process.argv;
    if (args.length <= 1) {
        exit(1);
    }
    if (!Object.keys(commandMap).includes(args[2])) {
        console.error('invalid command');
        exit(1);
    }
    const command = args[2];
    const remainingArgs = args.slice(3) ?? [];
    if (argMap[command].length !== remainingArgs.length) {
        console.error(`invalid number of arguments supplied for ${command}: received ${remainingArgs.length}, expected ${argMap[command].length}`);
        exit(1);
    }

    commandMap[command](...remainingArgs);
};

run();
