-- CreateTable
CREATE TABLE "User" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "forgotPasswordToken" TEXT,
    "forgotPasswordTokenExpiry" DATETIME,
    "verifyToken" TEXT,
    "verifyTokenExpiry" DATETIME
);

-- CreateTable
CREATE TABLE "Problem" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "problem_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "videoId" TEXT,
    "link" TEXT
);

-- CreateTable
CREATE TABLE "AttemptedProblem" (
    "_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pid" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL DEFAULT false,
    "uid" INTEGER NOT NULL,
    CONSTRAINT "AttemptedProblem_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Problem" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AttemptedProblem_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_problem_id_key" ON "Problem"("problem_id");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_order_key" ON "Problem"("order");
