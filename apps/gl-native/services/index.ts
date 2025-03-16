import type { SQLiteDatabase } from 'expo-sqlite';
import type { ServiceName } from '@/types/Services';
import { LocalService } from './local';

export default class ServiceManager { 
    private services: Record<ServiceName, any> | null = null;

    constructor(db: SQLiteDatabase) {
        this.services = {
            LOCAL: new LocalService(db),
        };
    }

    getService(name: ServiceName): any {
        return this.services[name];
    }
}
