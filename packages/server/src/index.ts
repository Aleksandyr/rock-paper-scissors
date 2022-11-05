import express from 'express';
import db from './db';
import { SyncDB } from './db/Sync';

const port = 3200;

const app = express();

app.get('/test', (req, res) => {
  res.send({ data: 'Hello from the server' });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
  SyncDB();
  console.log('DB was feeded');
} catch(e) {
  console.log('Unable to connec to db:', e);
}

