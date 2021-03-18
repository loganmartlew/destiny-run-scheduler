const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// import sqlite3 from 'sqlite3';
// import { open } from 'sqlite';

(async () => {
  const db = await open({
    filename: './runscheduler.sqlite',
    driver: sqlite3.Database,
  });

  // await db.exec(
  //   'INSERT INTO user (name, email) VALUES ("Gunnar", "gunnar@gmail.com")'
  // );

  // await db.exec('INSERT INTO schedule (name) VALUES ("Other Runs")');

  await db.exec('INSERT INTO user_schedule (userid, scheduleid) VALUES (2, 2)');
})();
