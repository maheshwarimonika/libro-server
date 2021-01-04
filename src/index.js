import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Promise from 'bluebird';

import auth from './routes/auth';
import users from './routes/users';
import books from './routes/books';

dotenv.config();
const app = express();

app.use(bodyParser.json());
const dbUrl = process.env.DATABASE_URL
  ? process.env.DATABASE_URL
  : 'mongodb://root:root123@ds117495.mlab.com:17495/libro'
mongoose.Promise = Promise;
mongoose.connect(dbUrl, {useMongoClient:true})
  .then(() => console.log('Connection successful'))
.catch((err) => console.log(err))

app.use('/api/auth',auth);
app.use('/api/users',users);
app.use('/api/books',books);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

app.listen(8080, () => console.log("Running on localhost 8080"));
