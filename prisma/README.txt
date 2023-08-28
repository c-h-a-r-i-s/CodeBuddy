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

1) For SQLITE this file starts with:
- - - - - - - - - - - - - - - - - - - - - - -
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
- - - - - - - - - - - - - - - - - - - - - - -

2) For PostgraSQL (supabase) this file starts with:
- - - - - - - - - - - - - - - - - - - - - - -
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  directUrl         = env("DIRECT_URL")
}
- - - - - - - - - - - - - - - - - - - - - - -

-----------------
   S T E P   4  
-----------------
1) For SQLITE, add the following variables to the .env file:
DATABASE_URL = file:./dev.db


2) For PostgraSQL, add the following variables to the .env file:
# PostgreSQL connection string used for migrations
DIRECT_URL = postgres://postgres:[DB PASSWORD].brqiqiuwaohenfzhozlq.supabase.co:5432/postgres

# PostgreSQL connection string with pgBouncer config — used by Prisma Client
DATABASE_URL = postgres://postgres:[DB PASSWORD]@db.brqiqiuwaohenfzhozlq.supabase.co:5432/postgres?pgbouncer=true

where the [DB PASSWORD] should be replaced by the database password

-----------------
   S T E P   5  
-----------------
Run
$ npx prisma migrate dev --name init
This will create a 'migrations' subfolder in folder 'prisma'

1) For SQLITE, it will also create the DB tables in the local db file.

2) For PostgraSQL, we need to create the DB tables manually as follows:
- Go to the 'prisma/migrations/'<14-digit timestamp>_init' (e.g. '20230825212842_init').
- Open file 'migration.sql' and copy its contents.
- Go to the supabase website, select the database and on the left sidebar, click on 'SQL Editor'.
- Paste the script over there and run it.

-----------------
   S T E P   6  
-----------------
Initializing the DB tables:

1) For SQLITE, do the following:
- Open a terminal and navigate to the prisma directory (i.e., 'cd prisma')
- Run
$ sqlite3 dev.db
$ .read seed.sql
$ .quit

2) For PostgraSQL, do the following:
- Go to the supabase website, select the database and on the left sidebar, click on 'Table Editor'.
- From the tables, select 'Problem'
- Click 'Insert' -> 'Import data fromCSV'
- Drag and drop file 'Problem_rows.csv'. It will preview the data that will be inserted.
- Click on button 'Import data'