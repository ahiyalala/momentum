import * as SQLite from "expo-sqlite";
import { openDatabase } from "expo-sqlite";
import { AddTaskParam } from "../intrerfaces";

export default class DatabaseAPI {
  private db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase("tymbox");
  }

  dropTables = () => {
    this.db.transaction((tx) => {
      tx.executeSql(`DROP TABLE tasks`);
      tx.executeSql(`DROP TABLE progress`);
    });
  };

  loadDb = () => {
    this.db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tasks (taskId INTEGER PRIMARY KEY AUTOINCREMENT, taskName TEXT NOT NULL, taskDescription TEXT NOT NULL, totalElapsed INTEGER NOT NULL);`
      );
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS progress (progressId INTEGER PRIMARY KEY AUTOINCREMENT, taskId INTEGER NOT NULL, startTime TEXT NOT NULL, endTime TEXT NOT NULL, elapsed INTEGER NOT NULL);`
      );
    });
  };

  addNewTask = ({
    taskName,
    taskDescription,
    startTime,
    endTime,
    elapsed,
    callback,
  }: AddTaskParam) => {
    const taskQuery = `INSERT INTO tasks (taskName, taskDescription, totalElapsed) VALUES (?,?,?);`;
    const progressQuery = `INSERT INTO progress (taskId, startTime, endTime, elapsed) VALUES (?,?,?,?);`;
    this.db.transaction((tx) => {
      tx.executeSql(
        taskQuery,
        [taskName, taskDescription, elapsed],
        (tx, { insertId }) => {
          console.log(insertId);
          tx.executeSql(
            progressQuery,
            [insertId, startTime, endTime, elapsed],
            (ts) => {
              callback(true);
            },
            (_tx, err) => {
              console.log(err.message);
              callback(false);
              return true;
            }
          );
        },
        (_tx, err) => {
          console.log(err.message);
          callback(false);
          return false;
        }
      );
    });
  };

  getTaskOverview = (callback: any) => {
    const _now = new Date();

    const _todayStart = new Date(
      _now.getFullYear(),
      _now.getMonth(),
      _now.getDate(),
      0,
      0,
      0,
      0
    ).toISOString();
    const _todayEnd = new Date(
      _now.getFullYear(),
      _now.getMonth(),
      _now.getDate(),
      23,
      59,
      29,
      0
    ).toISOString();
    const getTasks = `SELECT DISTINCT t.taskId, taskName, taskDescription, totalElapsed, datetime(p.starttime,'localtime') as localstarttime FROM tasks as t LEFT JOIN progress as p ON t.taskId = p.progressId;`;

    this.db.transaction((tx) => {
      tx.executeSql(getTasks, [], (_tx, { rows: { item, length, _array } }) => {
        callback(_array);
      });
    });
  };

  getTasksToday = (callback: any) => {
    const _now = new Date();

    const _todayStart = new Date(
      _now.getFullYear(),
      _now.getMonth(),
      _now.getDate(),
      0,
      0,
      0,
      0
    ).toISOString();
    const _todayEnd = new Date(
      _now.getFullYear(),
      _now.getMonth(),
      _now.getDate(),
      23,
      59,
      29,
      0
    ).toISOString();
    const getTasks = `SELECT DISTINCT t.taskId, taskName, taskDescription, totalElapsed, datetime(p.starttime,'localtime') as localstarttime FROM tasks as t LEFT JOIN progress as p ON t.taskId = p.progressId WHERE localstarttime > JulianDay('${_todayStart}') AND localstarttime < JulianDay('${_todayEnd}');`;

    this.db.transaction((tx) => {
      tx.executeSql(getTasks, [], (_tx, { rows: { item, length, _array } }) => {
        callback(_array);
      });
    });
  };
}
