-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "urgent" INTEGER NOT NULL,
    "important" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_description_key" ON "Task"("description");
