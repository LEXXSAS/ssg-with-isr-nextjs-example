import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Qwepoi91@@@',
  database: 'newnotes'
});
