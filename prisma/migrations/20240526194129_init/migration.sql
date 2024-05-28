-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "deadline" INTEGER NOT NULL,
    "financial_importance" INTEGER NOT NULL,
    "spiritual_importance" INTEGER NOT NULL,
    "social_emotional_importance" INTEGER NOT NULL,
    "physical_importance" INTEGER NOT NULL,
    "status" TEXT NOT NULL
);
