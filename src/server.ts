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
app.use(cors());
app.use(
  auth({
    users: { admin: 'supersecret' },
  })
);
app.use(morgan('tiny', { stream }));

app.use('/db', expressPouchDb(PouchDB));

app.listen({ port: process.env.PORT || 8080 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT || '8080'}/db`
  )
);
