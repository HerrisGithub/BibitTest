const mysql = require('mysql2');

class DB {
  constructor(dbconfig) {
    this.pool = new mysql.createPool(dbconfig);
    const { database } = dbconfig;
    if (!database) {
      throw new TypeError();
    }
    this.schema = database;
  }

  /**
   * DB connection pool
   */
  init() {
    const { pool } = this;
    if (!pool) {
      throw new Error('Connection pool is not created');
    }
    // Test connection
    return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
        if (err) reject(err);
        else {
          pool.releaseConnection(conn);
          resolve();
        }
      });
    });
  }

  /**
   * DB connection pool
   * @param {string} sql
   * @param {Array} params
   */
  query(sql, params = []) {
    const { pool } = this;
    if (!pool) {
      throw new Error('Connection pool is not created');
    }
    if (typeof sql !== 'string') {
      throw new TypeError('Invalid argument(s) type');
    }
    // Query directly
    return new Promise((resolve, reject) => {
      pool.query(sql, params, (error, rows, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve(rows, fields);
        }
      });
    });
  }
}


// const pg = require('pg');

// class DB {
//   constructor(dbconfig) {
//     this.pool = new pg.Pool(dbconfig);
//     const { database } = dbconfig;
//     if (!database) {
//       throw new TypeError();
//     }
//     this.schema = database;
//   }

//   /**
//    * DB connection pool 을 생성하는 함수
//    */
//   init() {
//     const { pool } = this;
//     if (!pool) {
//       throw new Error('Connection pool is not created');
//     }
//     // Test connection
//     return new Promise((resolve, reject) => {
//       pool.connect((err, client, done) => {
//         if (err) reject(err);
//         else {
//           // pool.releaseConnection(conn);
//           resolve();
//         }
//       });
//     });
//   }

//   /**
//    * DB connection pool
//    * @param {string} sql
//    * @param {Array} params
//    */
//   query(sql, params = []) {
//     const { pool } = this;
//     if (!pool) {
//       throw new Error('Connection pool is not created');
//     }
//     if (typeof sql !== 'string') {
//       throw new TypeError('Invalid argument(s) type');
//     }
//     // Query directly
//     return new Promise((resolve, reject) => {
//       pool.query(sql, params, (error, rows, fields) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(rows, fields);
//         }
//       });
//     });
//   }
// }


module.exports = DB;
