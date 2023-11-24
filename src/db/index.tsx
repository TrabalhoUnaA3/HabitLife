import {
  SQLiteDatabase,
  Transaction,
  openDatabase,
} from 'react-native-sqlite-storage';
import {habitQuery} from './HabiDatabase';
import {navigationQuery} from '../services/ChangeNavigationService';
import {createHabitsTable} from '../services/HabitsService';

class DatabaseManager {
  public db: SQLiteDatabase | null = null;

  constructor() {
    this.initDatabase();
  }

  private initDatabase() {
    this.db = openDatabase(
      {
        name: 'habitlife.db',
        location: 'default',
      },
      () => {
        console.log('Database opened successfully');
        this.createTables();
      },
      error => console.error('Error opening database: ', error),
    );
  }

  public executeTransaction(
    transactionCallback: (tx: Transaction) => void,
  ): Promise<void> {
    if (!this.db) {
      throw new Error('Database not initialized');
    }

    return new Promise((resolve, reject) => {
      this.db?.transaction(
        tx => {
          transactionCallback(tx);
        },
        error => {
          console.error('Transaction error: ', error);
          reject(error);
        },
        () => {
          resolve();
        },
      );
    });
  }
  public executeSql(sql: string, params?: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        return reject(new Error('Banco de dados não inicializado.'));
      }

      this.db.executeSql(
        sql,
        params || [],
        (transaction, result) => resolve(result),
        (transaction, error) => reject(error),
      );
    });
  }
  private tablesCreated = false;

  public resetTablesCreated() {
    this.tablesCreated = false;
  }

  private createTables() {
    const createTableQueries = [navigationQuery, habitQuery, createHabitsTable];

    this.executeTransaction(tx => {
      if (!this.tablesCreated) {
        createTableQueries.forEach(query => {
          tx.executeSql(query);
        });
      }
    })
      .then(() => {
        this.tablesCreated = true;
      })
      .catch(error => console.error('Error creating tables: ', error));
  }
}

export default new DatabaseManager();
