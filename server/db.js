import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username_for_db',
  password: 'your_password_for_db',
  database: 'newnotes'
});
