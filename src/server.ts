import * as express from 'express';
import * as auth from 'express-basic-auth';
import * as cors from 'cors';
import logger from './utils/logger';
import * as morgan from 'morgan';
import * as PouchDB from 'pouchdb';
import * as expressPouchDb from 'express-pouchdb';
import * as sqlDown from 'sqldown';

class MyStream {
  write(text: string) {
    logger.info(text);
  }
}

const stream = new MyStream();

const app = express();
const whitelist = [
  'https://www.askkyn.com',
  'http://www.askkyn.com',
  'http://127.0.0.1:8000',
  'https://127.0.0.1:8000',
  'http://localhost:8000',
  'https://localhost:8000',
  'http://localhost:3000',
  'https://localhost:3000',
];
app.use(
  cors({
    origin: whitelist,
    credentials: true,
  })
);

const sqlPouchDB = PouchDB.defaults({ db: sqlDown });

app.use(morgan('tiny', { stream }));
app.use('/db', expressPouchDb(sqlPouchDB));

const dbConnection =
  process.env.NODE_ENV === 'production'
    ? 'pg://wawvkqbphmvavu:a60dd0e1b5cc6655a950c1a21239e38872678c9424b40f418346757131873c8f@ec2-54-247-158-179.eu-west-1.compute.amazonaws.com:5432/det1ho3dnt28s0'
    : 'test.db';

const myPouchInstance = sqlPouchDB(dbConnection);

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || '8080'}/db`
  )
);
