/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `user_interest_sections` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_interest_sections_name_key" ON "user_interest_sections"("name");
