-- CreateTable
CREATE TABLE "link" (
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "link_name_key" ON "link"("name");
