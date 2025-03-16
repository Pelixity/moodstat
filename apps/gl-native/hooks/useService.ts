import type { ServiceName } from '@/types/Services';
import { useMemo } from 'react';
import { useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import ServiceManager from '@/services';

const useService = (name: ServiceName) => {
    const db: SQLiteDatabase = useSQLiteContext();
    const services = useMemo(
        () => new ServiceManager(db),
        [db],
    );

    return services.getService(name);
};

export default useService;
