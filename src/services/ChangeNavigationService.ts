import {
  ResultSetRowList,
  SQLiteDatabase,
  enablePromise,
} from 'react-native-sqlite-storage';
import {getDBConnection} from '../db';

enablePromise(true);

let db: SQLiteDatabase | null = null;

export async function initializeDatabase() {
  db = await getDBConnection();

  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS change_navigation (id INTEGER PRIMARY KEY AUTOINCREMENT, showHome TEXT, appStartData TEXT);',
      [],
      (_, error) => {
        console.error(error);
      },
    );
  });
}

interface ChangeNavigationObject {
  showHome: string;
  appStartData: string;
}

interface DatabaseRow {
  id: number;
  showHome: string;
  appStartData: string;
}

const setShowHome = (obj: ChangeNavigationObject): Promise<number> => {
  console.log('Inside setShowHome:', obj);
  return new Promise((resolve, reject) => {
    console.log(db);
    db?.transaction(tx => {
      tx.executeSql(
        'INSERT INTO change_navigation (showHome, appStartData) values (?, ?);',
        [obj.showHome, obj.appStartData],
        (_, {rowsAffected, insertId}) => {
          if (rowsAffected > 0) {
            resolve(insertId);
          }
        },
        (_, error) => {
          reject(error);
        },
      );
    });
  });
};

const checkShowHome = (id: number): Promise<DatabaseRow> => {
  return new Promise((resolve, reject) => {
    db?.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM change_navigation where id=?;',
        [id],
        (_, result) => {
          const rows = result.rows as ResultSetRowList;
          if (rows.length > 0) {
            const firstRow = rows.item(0) as DatabaseRow;
            resolve(firstRow);
          } else {
            reject(new Error('Obj not found: id=' + id));
          }
        },
        (_, error) => reject(error),
      );
    });
  });
};

export default {
  setShowHome,
  checkShowHome,
};
