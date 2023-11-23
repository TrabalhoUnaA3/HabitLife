import {enablePromise} from 'react-native-sqlite-storage';
import DatabaseManager from '../db';

enablePromise(true);

const TABLE_NAME = 'create_habits';
const ID_COLUMN = 'id';
const HABIT_AREA_COLUMN = 'habitArea';
const HABIT_NAME_COLUMN = 'habitName';
const HABIT_FREQUENCY_COLUMN = 'habitFrequency';
const HABIT_HAS_NOTIFICATION_COLUMN = 'habitHasNotification';
const HABIT_NOTIFICATION_FREQUENCY_COLUMN = 'habitNotificationFrequency';
const HABIT_NOTIFICATION_TIME_COLUMN = 'habitNotificationTime';
const LAST_CHECK_COLUMN = 'lastCheck';
const DAYS_WITHOUT_CHECKS_COLUMN = 'daysWithoutChecks';
const PROGRESS_BAR_COLUMN = 'progressBar';
const HABIT_IS_CHECKED_COLUMN = 'habitIsChecked';
const HABIT_CHECKS_COLUMN = 'habitChecks';

let db = DatabaseManager.db;

export const createHabitsTable = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    ${ID_COLUMN} INTEGER PRIMARY KEY AUTOINCREMENT, 
    ${HABIT_AREA_COLUMN} TEXT, 
    ${HABIT_NAME_COLUMN} TEXT, 
    ${HABIT_FREQUENCY_COLUMN} TEXT, 
    ${HABIT_HAS_NOTIFICATION_COLUMN} BOOLEAN, 
    ${HABIT_NOTIFICATION_FREQUENCY_COLUMN} TEXT, 
    ${HABIT_NOTIFICATION_TIME_COLUMN} TEXT, 
    ${LAST_CHECK_COLUMN} TEXT, 
    ${DAYS_WITHOUT_CHECKS_COLUMN} INTEGER, 
    ${PROGRESS_BAR_COLUMN} INTEGER, 
    ${HABIT_IS_CHECKED_COLUMN} BOOLEAN, 
    ${HABIT_CHECKS_COLUMN} INTEGER
);`;

export default class CreateHabits {
  habitArea: string;
  habitName: string;
  habitFrequency: string;
  habitHasNotification: boolean;
  habitNotificationFrequency: string;
  habitNotificationTime: string;
  lastCheck: string;
  daysWithoutChecks: number;
  progressBar: number;
  habitIsChecked: number;
  habitChecks: number;

  constructor(
    habitArea: string,
    habitName: string,
    habitFrequency: string,
    habitHasNotification: boolean,
    habitNotificationFrequency: string,
    habitNotificationTime: string,
    lastCheck: string,
    daysWithoutChecks: number,
    progressBar: number,
    habitIsChecked: number,
    habitChecks: number,
  ) {
    this.habitArea = habitArea;
    this.habitName = habitName;
    this.habitFrequency = habitFrequency;
    this.habitHasNotification = habitHasNotification;
    this.habitNotificationFrequency = habitNotificationFrequency;
    this.habitNotificationTime = habitNotificationTime;
    this.lastCheck = lastCheck;
    this.daysWithoutChecks = daysWithoutChecks;
    this.progressBar = progressBar;
    this.habitIsChecked = habitIsChecked;
    this.habitChecks = habitChecks;
  }

  static createHabit(obj: CreateHabits): Promise<any> {
    return new Promise((resolve, reject) => {
      db?.transaction(tx => {
        return tx.executeSql(
          `INSERT INTO ${TABLE_NAME} (
                      ${HABIT_AREA_COLUMN}, 
                      ${HABIT_NAME_COLUMN}, 
                      ${HABIT_FREQUENCY_COLUMN}, 
                      ${HABIT_HAS_NOTIFICATION_COLUMN}, 
                      ${HABIT_NOTIFICATION_FREQUENCY_COLUMN}, 
                      ${HABIT_NOTIFICATION_TIME_COLUMN}, 
                      ${LAST_CHECK_COLUMN}, 
                      ${DAYS_WITHOUT_CHECKS_COLUMN}, 
                      ${PROGRESS_BAR_COLUMN}, 
                      ${HABIT_IS_CHECKED_COLUMN}, 
                      ${HABIT_CHECKS_COLUMN}) 
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
          (_, {rowsAffected, insertId}) => {
            if (rowsAffected > 0) resolve(insertId);
            else reject('Error inserting obj: ' + JSON.stringify(obj));
          },
          (_, error) => reject(error),
        );
      });
    });
  }

  static async findByArea(habitArea: string): Promise<CreateHabits[]> {
    const query = `SELECT * FROM ${TABLE_NAME} WHERE ${HABIT_AREA_COLUMN} LIKE ?;`;
    const habits: CreateHabits[] = [];
    if (db == null) {
      return habits;
    }
    const [result] = await db?.executeSql(query, [habitArea]);
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      habits.push(
        new CreateHabits(
          row[HABIT_AREA_COLUMN],
          row[HABIT_NAME_COLUMN],
          row[HABIT_FREQUENCY_COLUMN],
          row[HABIT_HAS_NOTIFICATION_COLUMN],
          row[HABIT_NOTIFICATION_FREQUENCY_COLUMN],
          row[HABIT_NOTIFICATION_TIME_COLUMN],
          row[LAST_CHECK_COLUMN],
          row[DAYS_WITHOUT_CHECKS_COLUMN],
          row[PROGRESS_BAR_COLUMN],
          row[HABIT_IS_CHECKED_COLUMN],
          row[HABIT_CHECKS_COLUMN],
        ),
      );
    }

    return habits;
  }
  static updateHabit = (obj: CreateHabits): Promise<any> => {
    return new Promise((resolve, reject) => {
      db?.transaction(tx => {
        tx.executeSql(
          `UPDATE ${TABLE_NAME} SET 
                      ${HABIT_NAME_COLUMN}=?,
                      ${HABIT_FREQUENCY_COLUMN}=?,
                      ${HABIT_HAS_NOTIFICATION_COLUMN}=?,
                      ${HABIT_NOTIFICATION_FREQUENCY_COLUMN}=?, 
                      ${HABIT_NOTIFICATION_TIME_COLUMN}=? 
                      WHERE ${HABIT_AREA_COLUMN}=?;`,
          [
            obj.habitName,
            obj.habitFrequency,
            obj.habitHasNotification,
            obj.habitNotificationFrequency,
            obj.habitNotificationTime,
            obj.habitArea,
          ],
          (_, {rowsAffected}) => {
            if (rowsAffected > 0) resolve(rowsAffected);
            else reject('Error updating obj');
          },
          (_, error) => reject(error),
        );
      });
    });
  };

  static async deleteByName(habitArea: string) {
    const query = `DELETE FROM ${TABLE_NAME} WHERE ${HABIT_AREA_COLUMN}=?;`;
    await db?.executeSql(query, [habitArea]);
  }

  static async changeProgress(obj: CreateHabits) {
    const query = `UPDATE ${TABLE_NAME} SET ${PROGRESS_BAR_COLUMN}=? WHERE ${HABIT_AREA_COLUMN}=?`;
    await db?.executeSql(query, [obj.progressBar, obj.habitArea]);
  }
}
