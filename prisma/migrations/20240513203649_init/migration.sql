-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "urgent" BOOLEAN NOT NULL,
    "important" BOOLEAN NOT NULL,
    "hours" INTEGER NOT NULL
);
