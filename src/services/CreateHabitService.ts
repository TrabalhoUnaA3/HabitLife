import {
    ResultSetRowList,
    SQLiteDatabase,
    enablePromise,
} from 'react-native-sqlite-storage';
import { getDBConnection } from '../db';

enablePromise(true);

let db: SQLiteDatabase | null = null;

export interface Habit {
    habitArea: string;
    habitName: string;
    habitFrequency: string;
    habitHasNotification: boolean;
    habitNotificationFrequency: string;
    habitNotificationTime: string;
    lastCheck: string;
    daysWithoutChecks: number;
    progressBar: number;
    habitIsChecked: boolean;
    habitChecks: number;
}

export async function initializeDatabase() {
    db = await getDBConnection();

    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS habits (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                habitArea TEXT, 
                habitName TEXT, 
                habitFrequency TEXT, 
                habitHasNotification BOOLEAN, 
                habitNotificationFrequency TEXT, 
                habitNotificationTime TEXT, 
                lastCheck TEXT, 
                daysWithoutChecks INTEGER, 
                progressBar INTEGER, 
                habitIsChecked BOOLEAN, 
                habitChecks INTEGER
            );`,
            [],
            (_, error) => {
                console.error(error);
            },
        );
    });
}

