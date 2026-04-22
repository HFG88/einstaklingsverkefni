-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('CHARACTER', 'LOCATION', 'FACTION', 'EVENT', 'NOTE');

-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('LIVES_IN', 'MEMBER_OF', 'OCCURS_IN', 'LOCATED_IN', 'RULES');

-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "type" "EntityType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityRelation" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "relation" "RelationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntityRelation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_slug_key" ON "Entity"("slug");

-- CreateIndex
CREATE INDEX "Entity_type_idx" ON "Entity"("type");

-- CreateIndex
CREATE INDEX "Entity_name_idx" ON "Entity"("name");

-- CreateIndex
CREATE INDEX "EntityRelation_fromId_idx" ON "EntityRelation"("fromId");

-- CreateIndex
CREATE INDEX "EntityRelation_toId_idx" ON "EntityRelation"("toId");

-- CreateIndex
CREATE INDEX "EntityRelation_relation_idx" ON "EntityRelation"("relation");

-- CreateIndex
CREATE UNIQUE INDEX "EntityRelation_fromId_toId_relation_key" ON "EntityRelation"("fromId", "toId", "relation");

-- AddForeignKey
ALTER TABLE "EntityRelation" ADD CONSTRAINT "EntityRelation_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityRelation" ADD CONSTRAINT "EntityRelation_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
