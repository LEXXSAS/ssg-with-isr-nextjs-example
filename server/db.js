import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username_mysql',
  password: 'your_password_mysql',
  database: 'newnotes'
});
