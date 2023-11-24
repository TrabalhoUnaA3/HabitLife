import {enablePromise} from 'react-native-sqlite-storage';
import DatabaseManager from '../../db';

const TABLE_NAME = 'Habits';
const TITLE_COLUMN = 'title';
const DESCRIPTION_COLUMN = 'description';
const CREATED_AT_COLUMN = 'created_at';
const HABIT_TYPE_COLUMN = 'habit_type';
const ID_COL = 'id';

const db = DatabaseManager.db;

enablePromise(true);

export const habitQuery = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
          ${TITLE_COLUMN} VARCHAR(255) NOT NULL,
          ${DESCRIPTION_COLUMN} VARCHAR(255) NOT NULL,
          ${CREATED_AT_COLUMN} VARCHAR(50) NOT NULL,
          ${HABIT_TYPE_COLUMN} VARCHAR(50) NOT NULL,
          ${ID_COL} TEXT PRIMARY KEY
      )`;

export default class Habit {
  title: string;
  description: string;
  createdAt: string;
  habitType: string;
  id: string;

  constructor(
    title: string,
    description: string,
    createdAt: string,
    habitType: string,
    id: string,
  ) {
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.habitType = habitType;
    this.id = id;
  }

  static async create(habit: Habit) {
    const query = `INSERT INTO ${TABLE_NAME} (
            ${TITLE_COLUMN},
            ${DESCRIPTION_COLUMN}, 
            ${CREATED_AT_COLUMN}, 
            ${HABIT_TYPE_COLUMN}, 
            ${ID_COL}
           
         ) VALUES (?, ?, ?, ?, ?)`;
    await db?.executeSql(query, [
      habit.title,
      habit.description,
      habit.createdAt,
      habit.habitType,
      habit.id,
    ]);
  }

  static async getAll(
    orderBy: 'asc' | 'desc' = 'desc',
    habitType?: string,
  ): Promise<Habit[]> {
    let query = `SELECT * FROM ${TABLE_NAME} ORDER BY ${CREATED_AT_COLUMN} ${orderBy}`;
    const params: any[] = [];

    if (habitType !== undefined) {
      query = `SELECT * FROM ${TABLE_NAME} WHERE ${HABIT_TYPE_COLUMN} LIKE ? ORDER BY ${CREATED_AT_COLUMN} ${orderBy}`;
      params.push(habitType);
    }

    const habits: Habit[] = [];
    if (db == null) {
      return habits;
    }
    const [result] = await db?.executeSql(query, params);

    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      habits.push(
        new Habit(
          row[TITLE_COLUMN],
          row[DESCRIPTION_COLUMN],
          row[CREATED_AT_COLUMN],
          row[HABIT_TYPE_COLUMN],
          row[ID_COL],
        ),
      );
    }

    return habits;
  }

  static async update(habit: Habit) {
    const query = `UPDATE ${TABLE_NAME} SET ${TITLE_COLUMN} = ?, ${DESCRIPTION_COLUMN} = ? WHERE ${ID_COL} = ?`;
    await db?.executeSql(query, [habit.title, habit.description, habit.id]);
  }

  static async delete(id: string) {
    const query = `DELETE FROM ${TABLE_NAME} WHERE ${ID_COL} = ?`;
    await db?.executeSql(query, [id]);
  }
}
