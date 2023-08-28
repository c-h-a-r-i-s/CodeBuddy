-----------------
   S T E P   1   
-----------------
Run
$ npm i prisma

-----------------
   S T E P   2   
-----------------
Run
$ npx prisma init

-----------------
   S T E P   3   
-----------------
Edit the contnent for the prisma schema file (i.e., schema.prisma)
For SQLITE this file starts with:
- - - - - - - - - - - - - - - - - - - - - - -
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
- - - - - - - - - - - - - - - - - - - - - - -

-----------------
   S T E P   4  
-----------------
Add the following variables to the .env file:
DATABASE_URL = file:./dev.db

-----------------
   S T E P   5  
-----------------
Run
$ npx prisma migrate dev --name init
This will create a 'migrations' subfolder in folder 'prisma'
It will create the DB tables in the local db file.

-----------------
   S T E P   6  
-----------------
Initializing the DB tables:
Open a terminal and navigate to the prisma directory (i.e., 'cd prisma')
Run
$ sqlite3 dev.db
$ .read seed.sql
$ .quit
