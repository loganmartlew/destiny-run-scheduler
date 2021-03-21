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

  // await db.exec('INSERT INTO user_schedule (userid, scheduleid) VALUES (2, 2)');

  // await db.exec('INSERT INTO day (date, scheduleid) VALUES ("20/03/2021", 1)');
  // await db.exec(
  //   'INSERT INTO runrange (start, end, dayid, userid) VALUES (6, 11, 1, 1)'
  // );
  // await db.exec(
  //   'INSERT INTO runrange (start, end, dayid, userid) VALUES (6, 10, 1, 2)'
  // );

  await db.exec('INSERT INTO day (date, scheduleid) VALUES ("20/03/2021", 2)');
  await db.exec(
    'INSERT INTO runrange (start, end, dayid, userid) VALUES (6, 12, 2, 2)'
  );
  await db.exec('INSERT INTO day (date, scheduleid) VALUES ("21/03/2021", 2)');
  await db.exec(
    'INSERT INTO runrange (start, end, dayid, userid) VALUES (8, 11, 3, 2)'
  );
})();
