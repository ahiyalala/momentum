import * as SQLite from "expo-sqlite";
import { openDatabase } from "expo-sqlite";
import { AddTaskParam } from "../intrerfaces";

export default class DatabaseAPI {
  private db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = SQLite.openDatabase("tymbox");
  }

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
    const progressQuery = `INSERT INTO progress (taskId, startTime, endTime, elapsed) VALUES (?,${startTime},${endTime},${elapsed});`;
    this.db.transaction((tx) => {
      tx.executeSql(
        taskQuery,
        [taskName, taskDescription, elapsed],
        (_tx, { insertId }) => {
          _tx.executeSql(
            progressQuery,
            [insertId],
            (ts) => {
              callback(true);
            },
            (__tx, err) => {
              callback(false);
              return true;
            }
          );
        },
        (_tx, err) => {
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
    const getTasks = `SELECT DISTINCT t.taskId, taskName, taskDescription, totalElapsed, datetime(p.starttime,'localtime') as localstarttime FROM tasks as t LEFT JOIN progress as p ON t.taskId = p.taskId;`;

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
    const getTasks = `SELECT DISTINCT t.taskId, taskName, taskDescription, totalElapsed, datetime(p.starttime,'localtime') as localstarttime FROM tasks as t LEFT JOIN progress as p ON t.taskId = p.taskId WHERE localstarttime > JulianDay('${_todayStart}')`;

    this.db.transaction((tx) => {
      tx.executeSql(getTasks, [], (_tx, { rows: { item, length, _array } }) => {
        callback(_array);
      });
    });
  };

  getTaskHistory = (taskId: any, callback: any) => {
    const getHistory = `SELECT * FROM progress WHERE taskId = ${taskId} ORDER BY startTime DESC`;

    this.db.transaction((tx) => {
      tx.executeSql(
        getHistory,
        [],
        (_tx, { rows: { item, length, _array } }) => {
          callback(_array);
        }
      );
    });
  };

  addNewProgressToTask = ({
    taskId,
    startTime,
    endTime,
    elapsed,
    callback,
  }: any) => {
    const addProgress = `INSERT INTO progress (taskId, startTime, endTime, elapsed) VALUES (?,?,?,?)`;
    const getTotalElapsed = `SELECT totalElapsed FROM tasks WHERE taskId = ${taskId} LIMIT 1`;
    const addTotalElapsed = `UPDATE tasks SET totalElapsed = ? WHERE taskId = ?`;

    const errCallback = (_tx_, err) => {
      callback(false);
      return false;
    };
    this.db.transaction((tx) =>
      tx.executeSql(
        addProgress,
        [taskId, startTime, endTime, elapsed],
        (_tx) => {
          _tx.executeSql(
            getTotalElapsed,
            [],
            (__tx, { rows: { item, length, _array } }) => {
              if (length == 0) return;

              const totalElapsed =
                parseInt(_array[0].totalElapsed) + parseInt(elapsed);
              __tx.executeSql(
                addTotalElapsed,
                [totalElapsed, taskId],
                (___tx) => {
                  callback(true);
                },
                errCallback
              );
            },
            errCallback
          );
        },
        errCallback
      )
    );
  };

  deleteTask = (taskId: number, callback: any) => {
    const deleteTaskQuery = `DELETE FROM tasks WHERE taskId = ?`;
    const deleteProgress = `DELETE FROM progress WHERE taskId = ?`;

    this.db.transaction((tx) => {
      tx.executeSql(deleteTaskQuery, [taskId], (tx) => {
        tx.executeSql(deleteProgress, [taskId], (tx) => {
          callback(true);
        });
      });
    });
  };
}
