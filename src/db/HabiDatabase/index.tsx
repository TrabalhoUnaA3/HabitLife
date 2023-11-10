import {enablePromise, SQLiteDatabase} from 'react-native-sqlite-storage';

const TABLE_NAME = 'Habits';
const TITLE_COLUMN = 'title';
const DESCRIPTION_COLUMN = 'description';
const CREATED_AT_COLUMN = 'created_at';
const HABIT_TYPE_COLUMN = 'habit_type';
const ID_COL = 'id';

enablePromise(true);

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
          ${TITLE_COLUMN} VARCHAR(255) NOT NULL,
          ${DESCRIPTION_COLUMN} VARCHAR(255) NOT NULL,
          ${CREATED_AT_COLUMN} VARCHAR(50) NOT NULL,
          ${HABIT_TYPE_COLUMN} VARCHAR(50) NOT NULL,
          ${ID_COL} TEXT PRIMARY KEY
      )`;
  await db.executeSql(query);
};

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

  static async create(db: SQLiteDatabase, habit: Habit) {
    const query = `INSERT INTO ${TABLE_NAME} (
            ${TITLE_COLUMN},
            ${DESCRIPTION_COLUMN}, 
            ${CREATED_AT_COLUMN}, 
            ${HABIT_TYPE_COLUMN}, 
            ${ID_COL}
           
         ) VALUES (?, ?, ?, ?, ?)`;
    await db.executeSql(query, [
      habit.title,
      habit.description,
      habit.createdAt,
      habit.habitType,
      habit.id,
    ]);
  }

  static async getAll(
    db: SQLiteDatabase,
    orderBy: 'asc' | 'desc' = 'desc',
  ): Promise<Habit[]> {
    const query = `SELECT * FROM ${TABLE_NAME} ORDER BY ${CREATED_AT_COLUMN} ${orderBy}`;
    const [result] = await db.executeSql(query, []);

    const habits: Habit[] = [];
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

  static async update(db: SQLiteDatabase, habit: Habit) {
    const query = `UPDATE ${TABLE_NAME} SET ${DESCRIPTION_COLUMN} = ?, ${HABIT_TYPE_COLUMN} = ? WHERE ${ID_COL} = ?`;
    await db.executeSql(query, [habit.description, habit.habitType, habit.id]);
  }

  static async delete(db: SQLiteDatabase, id: string) {
    const query = `DELETE FROM ${TABLE_NAME} WHERE ${ID_COL} = ?`;
    await db.executeSql(query, [id]);
  }
}
