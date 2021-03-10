import faunadb from 'faunadb';

const secret: string = process.env.FAUNADB_SECRET_KEY!;

export const q = faunadb.query;
export const client = new faunadb.Client({ secret });
