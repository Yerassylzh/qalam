/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user_interests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_interests_name_key" ON "user_interests"("name");
