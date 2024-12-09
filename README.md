Nextj 14 ssg with isr generateStaticParams example

> [!WARNING]
>Before copying and start the project add your data in the file "db.js"
>replace 'your_password_for_db', 'your_password_for_db' and create in client .env.local and server folders .env file with replace db user db password with yours and .env.local add NEXT_PUBLIC_URL=localhost:your_port_mysql</br>
>```javascript
>host = 'localhost'; </br>
>user = 'your_username_for_db'; </br>
>password = 'your_password_for_db'; </br>
>database = 'newnotes'; </br>

> [!NOTE]
>Before start project
> create mysql db 'newnotes' with table 'notes', 'users', 'refresh'
>
>CREATE DATABASE `newnotes`;
>
> CREATE TABLE `notes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `body` varchar(255) NOT NULL,
  `priority` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
>
> [!NOTE]
> To start the project you need to run:

#### On server folder
command "node init -y" and "node install"
after "nodemon index.js" for start server

#### On client folder
command "node init -y" and "node install"
after "npm run build && npm run start"
