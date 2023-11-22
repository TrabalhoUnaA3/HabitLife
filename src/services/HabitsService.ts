import { enablePromise } from 'react-native-sqlite-storage';
import DatabaseManager from '../db';

enablePromise(true);

let db = DatabaseManager.db;

export const createHabitsTable = `CREATE TABLE IF NOT EXISTS habits (
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
);`

interface CreateHabitObject {
    habitArea: string;
    habitName: string;
    habitFrequency: string;
    habitHasNotification: string;
    habitNotificationFrequency: string;
    habitNotificationTime: string;
    lastCheck: string;
    daysWithoutChecks: string;
    progressBar: string;
    habitIsChecked: string;
    habitChecks: string;
}
const createHabit = (obj: CreateHabitObject): Promise<any> => {
    return new Promise((resolve, reject) => {
        db?.transaction((tx) => {
            return tx.executeSql(
                `INSERT INTO habits (
                    habitArea, 
                    habitName, habitFrequency, 
                    habitHasNotification, 
                    habitNotificationFrequency, 
                    habitNotificationTime, 
                    lastCheck, 
                    daysWithoutChecks, 
                    progressBar, 
                    habitIsChecked, 
                    habitChecks) 
                values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
                [
                    obj.habitArea,
                    obj.habitName,
                    obj.habitFrequency,
                    obj.habitHasNotification,
                    obj.habitNotificationFrequency,
                    obj.habitNotificationTime,
                    obj.lastCheck,
                    obj.daysWithoutChecks,
                    obj.progressBar,
                    obj.habitIsChecked,
                    obj.habitChecks,
                ],
                (_, { rowsAffected, insertId }) => {
                    if (rowsAffected > 0) resolve(insertId);
                    else reject("Error inserting obj: " + JSON.stringify(obj));
                },
                (_, error) => reject(error)
            );
        });
    });
};


const findByArea = (habitArea: string): Promise<CreateHabitObject> => {
    return new Promise((resolve, reject) => {
        db?.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM habits WHERE habitArea LIKE ?;",
                [habitArea],
                (_, result) => {
                    const rows = result.rows;
                    if (rows.length > 0) resolve(rows.item(0));
                    else reject(new Error(`object not found: habitArea ${habitArea}`))
                },
                (_, error) => reject(error)
            );
        });
    });
};

const updateHabit = (obj: CreateHabitObject): Promise<any> => {
    return new Promise((resolve, reject) => {
        db?.transaction((tx) => {
            tx.executeSql(
                `UPDATE habits SET 
                    habitName=?,
                    habitFrequency=?,
                    habitHasNotification=?,
                    habitNotificationFrequency=?, 
                    habitNotificationTime=? 
                    WHERE habitArea=?;`,
                [
                    obj.habitName,
                    obj.habitFrequency,
                    obj.habitHasNotification,
                    obj.habitNotificationFrequency,
                    obj.habitNotificationTime,
                    obj.habitArea,
                ],
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) resolve(rowsAffected);
                    else reject("Error updating obj");
                },
                (_, error) => reject(error)
            );
        });
    });
};

const deleteByName = async (habitArea: string) => {
    const query =
        `DELETE FROM habits WHERE habitArea=?;`;
    await db?.executeSql(query, [habitArea])
}

const changeProgress = (obj: CreateHabitObject): Promise<any> => {
    return new Promise((resolve, reject) => {
        db?.transaction((tx) => {
            tx.executeSql(
                "UPDATE habits SET progressBar=? WHERE habitArea=?;",
                [obj.progressBar, obj.habitArea],
                (_, { rowsAffected }) => {
                    if (rowsAffected > 0) resolve(rowsAffected);
                    else reject("Error updating obj");
                },
                (_, error) => reject(error)
            );
        });
    });
};

export default {
    createHabit,
    findByArea,
    updateHabit,
    deleteByName,
    changeProgress,
};