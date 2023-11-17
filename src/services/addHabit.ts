import {
    ResultSetRowList,
    SQLiteDatabase,
    enablePromise,
} from 'react-native-sqlite-storage';
import { Habit, initializeDatabase } from './CreateHabitService';

let db: SQLiteDatabase | null = null;


export async function addHabit(habit: Habit) {
    if (!db) {
        await initializeDatabase();
    }
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO habits (
                habitArea,
                habitName,
                habitFrequency,
                habitHasNotification,
                habitNotificationFrequency,
                habitNotificationTime,
                lastCheck,
                daysWithoutChecks,
                progressBar,
                habitIsChecked,
                habitChecks
            )`,
            [
                habit.habitArea,
                habit.habitName,
                habit.habitFrequency,
                habit.habitHasNotification ? 1 : 0,
                habit.habitNotificationFrequency,
                habit.habitNotificationTime,
                habit.lastCheck,
                habit.daysWithoutChecks,
                habit.progressBar,
                habit.habitIsChecked ? 1 : 0,
                habit.habitChecks,
            ],
            (_: any, results: { rowsAffected: number; }) => {
                if (results.rowsAffected > 0) {
                    console.log('habito add com sucesso');
                } else {
                    console.error('falha ao add habito');
                }
            }
        );
    });
}
