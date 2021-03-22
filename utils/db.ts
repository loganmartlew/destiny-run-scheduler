import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const useDb = async () => {
  const db = await open({
    filename: './runscheduler.sqlite',
    driver: sqlite3.Database,
  });

  await db.migrate();

  return db;
};
