import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, EntityType, RelationType } from "./generated/client.js";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const entities = [
    {
      name: "Frodo Baggins",
      slug: "frodo_baggins",
      description: "A hobbit of the Shire and Ring-bearer.",
      longDescription:
        "A hobbit of the Shire who carries the burden of the One Ring into the heart of Mordor.",
      type: EntityType.CHARACTER,
    },
    {
      name: "Aragorn",
      slug: "aragorn",
      description: "A ranger of the North and heir to the throne of Gondor.",
      longDescription:
        "A wandering ranger and heir of Isildur who rises to become king.",
      type: EntityType.CHARACTER,
    },

    {
      name: "The Shire",
      slug: "the_shire",
      description: "A peaceful land in Middle-earth, home to the hobbits.",
      longDescription:
        "A quiet and fertile land known for its hobbit settlements, green hills, and simple comforts.",
      type: EntityType.LOCATION,
    },
    {
      name: "Rivendell",
      slug: "rivendell",
      description: "An elven refuge in a hidden valley.",
      longDescription:
        "A hidden elven sanctuary of wisdom, beauty, healing, and ancient memory.",
      type: EntityType.LOCATION,
    },

    {
      name: "The Fellowship of the Ring",
      slug: "the_fellowship_of_the_ring",
      description: "A company formed to destroy the One Ring.",
      longDescription:
        "A small but fateful company assembled to oppose the Dark Lord and bear the Ring toward its destruction.",
      type: EntityType.FACTION,
    },
    {
      name: "The Rangers of the North",
      slug: "the_rangers_of_the_north",
      description: "The wandering Dúnedain who guard the lands of Eriador.",
      longDescription:
        "The last wandering Dúnedain of Arnor, protecting the wild lands in secret.",
      type: EntityType.FACTION,
    },

    {
      name: "The Council of Elrond",
      slug: "the_council_of_elrond",
      description:
        "A council held in Rivendell to decide the fate of the Ring.",
      longDescription:
        "A gathering of the free peoples in Rivendell where the Fellowship is formed and the fate of the Ring is decided.",
      type: EntityType.EVENT,
    },
    {
      name: "The Scouring of the Shire",
      slug: "the_scouring_of_the_shire",
      description:
        "The return of the hobbits to cleanse the Shire of corruption.",
      longDescription:
        "The hobbits return home and cast out the forces that have despoiled the Shire.",
      type: EntityType.EVENT,
    },

    {
      name: "The One Ring",
      slug: "the_one_ring",
      description: "The master ring forged by Sauron to dominate the others.",
      longDescription:
        "The One Ring is the central object of the War of the Ring and a source of corruption, power, and temptation.",
      type: EntityType.NOTE,
    },
    {
      name: "The Return of the King",
      slug: "the_return_of_the_king",
      description: "A prophecy and theme surrounding Aragorn's rise.",
      longDescription:
        "The return of the king symbolizes restoration, legitimacy, and hope against the growing darkness.",
      type: EntityType.NOTE,
    },
  ];

  for (const entity of entities) {
    await prisma.entity.upsert({
      where: { slug: entity.slug },
      update: {
        name: entity.name,
        description: entity.description,
        longDescription: entity.longDescription,
        type: entity.type,
      },
      create: entity,
    });
  }

  const allEntities = await prisma.entity.findMany();

  const entityMap = new Map(
    allEntities.map((entity) => [entity.slug, entity.id]),
  );

  const relationships = [
    {
      from: "frodo_baggins",
      to: "the_shire",
      relation: RelationType.LIVES_IN,
    },
    {
      from: "aragorn",
      to: "the_shire",
      relation: RelationType.LIVES_IN,
    },
    {
      from: "aragorn",
      to: "rivendell",
      relation: RelationType.LOCATED_IN,
    },
    {
      from: "frodo_baggins",
      to: "the_fellowship_of_the_ring",
      relation: RelationType.MEMBER_OF,
    },
    {
      from: "aragorn",
      to: "the_fellowship_of_the_ring",
      relation: RelationType.MEMBER_OF,
    },
    {
      from: "aragorn",
      to: "the_rangers_of_the_north",
      relation: RelationType.MEMBER_OF,
    },
    {
      from: "the_council_of_elrond",
      to: "rivendell",
      relation: RelationType.OCCURS_IN,
    },
    {
      from: "the_scouring_of_the_shire",
      to: "the_shire",
      relation: RelationType.OCCURS_IN,
    },
    {
      from: "aragorn",
      to: "the_shire",
      relation: RelationType.RULES,
    },
  ];

  for (const relationship of relationships) {
    const fromId = entityMap.get(relationship.from);
    const toId = entityMap.get(relationship.to);

    if (!fromId || !toId) {
      throw new Error(
        `Missing entity for relationship: ${relationship.from} -> ${relationship.to}`,
      );
    }

    await prisma.entityRelation.upsert({
      where: {
        fromId_toId_relation: {
          fromId,
          toId,
          relation: relationship.relation,
        },
      },
      update: {},
      create: {
        fromId,
        toId,
        relation: relationship.relation,
      },
    });
  }

  await prisma.characterDetails.upsert({
    where: { entityId: entityMap.get("frodo_baggins")! },
    update: {},
    create: {
      entityId: entityMap.get("frodo_baggins")!,
      race: "Hobbit",
      role: "Ring-bearer",
      profession: "Adventurer",
      status: "Alive",
      age: 50,
      gender: "Male",
      alignment: "Good",
      title: "Mr. Frodo",
    },
  });

  await prisma.characterDetails.upsert({
    where: { entityId: entityMap.get("aragorn")! },
    update: {},
    create: {
      entityId: entityMap.get("aragorn")!,
      race: "Human",
      role: "Ranger",
      profession: "Warrior",
      status: "Alive",
      age: 87,
      gender: "Male",
      alignment: "Good",
      title: "Strider",
    },
  });

  await prisma.locationDetails.upsert({
    where: { entityId: entityMap.get("the_shire")! },
    update: {},
    create: {
      entityId: entityMap.get("the_shire")!,
      locationType: "Region",
      size: "Large",
      climate: "Temperate",
      terrain: "Rolling hills and farmland",
      population: 10000,
      wealthLevel: "Comfortable",
      dangerLevel: "Low",
    },
  });

  await prisma.locationDetails.upsert({
    where: { entityId: entityMap.get("rivendell")! },
    update: {},
    create: {
      entityId: entityMap.get("rivendell")!,
      locationType: "Refuge",
      size: "Medium",
      climate: "Temperate",
      terrain: "Valley",
      population: 500,
      wealthLevel: "Wealthy",
      dangerLevel: "Low",
    },
  });

  await prisma.factionDetails.upsert({
    where: { entityId: entityMap.get("the_fellowship_of_the_ring")! },
    update: {},
    create: {
      entityId: entityMap.get("the_fellowship_of_the_ring")!,
      factionType: "Alliance",
      ideology: "Resistance against Sauron",
      goal: "Destroy the One Ring",
      reputation: "Heroic",
      influenceLevel: "Legendary",
      wealthLevel: "Modest",
      foundedYear: 3018,
    },
  });

  await prisma.factionDetails.upsert({
    where: { entityId: entityMap.get("the_rangers_of_the_north")! },
    update: {},
    create: {
      entityId: entityMap.get("the_rangers_of_the_north")!,
      factionType: "Order",
      ideology: "Guardianship and vigilance",
      goal: "Protect the North from shadow",
      reputation: "Secretive",
      influenceLevel: "Regional",
      wealthLevel: "Poor",
      foundedYear: 1975,
    },
  });

  await prisma.eventDetails.upsert({
    where: { entityId: entityMap.get("the_council_of_elrond")! },
    update: {},
    create: {
      entityId: entityMap.get("the_council_of_elrond")!,
      eventType: "Council",
      date: "TA 3018",
      outcome: "The Fellowship is formed",
      significance: "Major",
    },
  });

  await prisma.eventDetails.upsert({
    where: { entityId: entityMap.get("the_scouring_of_the_shire")! },
    update: {},
    create: {
      entityId: entityMap.get("the_scouring_of_the_shire")!,
      eventType: "Conflict",
      date: "TA 3019",
      outcome: "The Shire is restored",
      significance: "Major",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
