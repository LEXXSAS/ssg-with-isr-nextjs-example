import express from 'express';
import isLoggedIn from '../middlewares/isloggedin.js';
import mysqldump from 'mysqldump';
import path from 'path';
import { fileURLToPath } from 'url';

const DB_HOST='localhost'
const DB_USER='root'
const DB_PASSWORD='Qwepoi91@@@'
const DB_NAME='newnotes'

const middleWare = async(req, res, next) => {
  await mysqldump({
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    dumpToFile: pathToStatic,
  })
  .then((res) => {
    console.log('Dump created successfully');
  })
  .catch((err) => {
    // throw new Error(err)
    // res.status(500).json({message: 'Dump create error!!!'})
    console.log('Dump create error!!! ', err)
  })
  next()
}

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathToStatic = path.join(__dirname, '../static', 'dumpnewnotes.sql')

router.get('/file', isLoggedIn, middleWare, (req, res) => {
  // if (err) res.status(500).json({message: 'Dump create error!!!'})
  res.download(pathToStatic);
});

export default router;
