import * as express from 'express';
import * as auth from 'express-basic-auth';
import * as cors from 'cors';
import logger from './utils/logger';
import * as morgan from 'morgan';
import * as PouchDB from 'pouchdb';
import * as expressPouchDb from 'express-pouchdb';

class MyStream {
  write(text: string) {
    logger.info(text);
  }
}

const stream = new MyStream();

const app = express();
const whitelist = [
  "http://127.0.0.1:8000",
  "https://127.0.0.1:8000",
  "http://localhost:8000",
  "https://localhost:8000",
  "http://localhost:3000",
  "https://localhost:3000"
];
app.use(cors({
    origin: whitelist,
    credentials: true
  })
);

app.use(morgan('tiny', { stream }));

app.use('/db', expressPouchDb(PouchDB));

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || '8080'}/db`
  )
);
