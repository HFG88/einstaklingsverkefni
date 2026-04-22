-- CreateTable
CREATE TABLE "CharacterDetails" (
    "entityId" INTEGER NOT NULL,
    "race" TEXT,
    "role" TEXT,
    "profession" TEXT,
    "status" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "alignment" TEXT,
    "title" TEXT,
    "longDescription" TEXT,

    CONSTRAINT "CharacterDetails_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "LocationDetails" (
    "entityId" INTEGER NOT NULL,
    "locationType" TEXT,
    "size" TEXT,
    "climate" TEXT,
    "terrain" TEXT,
    "population" INTEGER,
    "wealthLevel" TEXT,
    "dangerLevel" TEXT,
    "longDescription" TEXT,

    CONSTRAINT "LocationDetails_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "FactionDetails" (
    "entityId" INTEGER NOT NULL,
    "factionType" TEXT,
    "ideology" TEXT,
    "goal" TEXT,
    "reputation" TEXT,
    "influenceLevel" TEXT,
    "wealthLevel" TEXT,
    "foundedYear" INTEGER,
    "longDescription" TEXT,

    CONSTRAINT "FactionDetails_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "EventDetails" (
    "entityId" INTEGER NOT NULL,
    "eventType" TEXT,
    "date" TEXT,
    "outcome" TEXT,
    "significance" TEXT,
    "longDescription" TEXT,

    CONSTRAINT "EventDetails_pkey" PRIMARY KEY ("entityId")
);

-- AddForeignKey
ALTER TABLE "CharacterDetails" ADD CONSTRAINT "CharacterDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationDetails" ADD CONSTRAINT "LocationDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FactionDetails" ADD CONSTRAINT "FactionDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventDetails" ADD CONSTRAINT "EventDetails_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE CASCADE ON UPDATE CASCADE;
