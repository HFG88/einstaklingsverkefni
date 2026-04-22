import { Hono } from "hono";
import { prisma } from "../prisma.js";
import { RelationType, EntityType } from "../../prisma/generated/client.js";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";

export const app = new Hono();

async function getRelationEndpoints(fromSlug: string, toSlug: string) {
  const fromEntity = await prisma.entity.findUnique({
    where: { slug: fromSlug },
  });

  const toEntity = await prisma.entity.findUnique({
    where: { slug: toSlug },
  });

  return { fromEntity, toEntity };
}

function isValidRelation(
  fromType: EntityType,
  toType: EntityType,
  relation: RelationType,
) {
  switch (relation) {
    case RelationType.LIVES_IN:
      return (
        fromType === EntityType.CHARACTER && toType === EntityType.LOCATION
      );

    case RelationType.LOCATED_IN:
      return (
        fromType === EntityType.CHARACTER && toType === EntityType.LOCATION
      );

    case RelationType.MEMBER_OF:
      return fromType === EntityType.CHARACTER && toType === EntityType.FACTION;

    case RelationType.OCCURS_IN:
      return fromType === EntityType.EVENT && toType === EntityType.LOCATION;

    case RelationType.RULES:
      return (
        (fromType === EntityType.CHARACTER ||
          fromType === EntityType.FACTION) &&
        toType === EntityType.LOCATION
      );

    default:
      return false;
  }
}

const relationSchema = z.object({
  fromSlug: z.string().trim().min(1),
  toSlug: z.string().trim().min(1),
  relation: z.enum(RelationType),
});

app.get("/", async (c) => {
  const entityRelations = await prisma.entityRelation.findMany({
    include: {
      from: true,
      to: true,
    },
  });

  return c.json(entityRelations);
});

app.post("/", zValidator("json", relationSchema), async (c) => {
  const { fromSlug, toSlug, relation } = c.req.valid("json");

  const { fromEntity, toEntity } = await getRelationEndpoints(fromSlug, toSlug);

  if (!fromEntity || !toEntity) {
    return c.json({ error: "one or both entities not found" }, 404);
  }

  if (!isValidRelation(fromEntity.type, toEntity.type, relation)) {
    return c.json(
      {
        error: `invalid relation: ${fromEntity.type} cannot ${relation} ${toEntity.type}`,
      },
      400,
    );
  }

  try {
    const entityRelation = await prisma.entityRelation.create({
      data: {
        fromId: fromEntity.id,
        toId: toEntity.id,
        relation,
      },
    });

    return c.json(entityRelation, 201);
  } catch (e: unknown) {
    if (
      e &&
      typeof e === "object" &&
      "code" in e &&
      (e as { code?: string }).code === "P2002"
    ) {
      return c.json({ error: "relation already exists" }, 409);
    }

    throw e;
  }
});

app.delete("/", zValidator("json", relationSchema), async (c) => {
  const { fromSlug, toSlug, relation } = c.req.valid("json");

  const { fromEntity, toEntity } = await getRelationEndpoints(fromSlug, toSlug);

  if (!fromEntity || !toEntity) {
    return c.json({ error: "one or both entities not found" }, 404);
  }

  try {
    await prisma.entityRelation.delete({
      where: {
        fromId_toId_relation: {
          fromId: fromEntity.id,
          toId: toEntity.id,
          relation,
        },
      },
    });

    return c.body(null, 204);
  } catch (e: unknown) {
    if (
      e &&
      typeof e === "object" &&
      "code" in e &&
      (e as { code?: string }).code === "P2025"
    ) {
      return c.json({ error: "relation not found" }, 404);
    }

    throw e;
  }
});
