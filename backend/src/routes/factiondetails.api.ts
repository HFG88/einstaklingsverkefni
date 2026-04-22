import { Hono } from "hono";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../prisma.js";
import { EntityType } from "../../prisma/generated/client.js";

export const app = new Hono();

const slugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

const factionDetailsSchema = z.object({
  slug: z.string().trim().min(1),
  factionType: z.string().trim().max(100).optional(),
  ideology: z.string().trim().max(500).optional(),
  goal: z.string().trim().max(500).optional(),
  reputation: z.string().trim().max(100).optional(),
  influenceLevel: z.string().trim().max(100).optional(),
  wealthLevel: z.string().trim().max(100).optional(),
  foundedYear: z.coerce.number().int().min(-100000).max(100000).optional(),
});

const patchFactionDetailsSchema = z.object({
  factionType: z.string().trim().max(100).optional(),
  ideology: z.string().trim().max(500).optional(),
  goal: z.string().trim().max(500).optional(),
  reputation: z.string().trim().max(100).optional(),
  influenceLevel: z.string().trim().max(100).optional(),
  wealthLevel: z.string().trim().max(100).optional(),
  foundedYear: z.coerce.number().int().min(-100000).max(100000).optional(),
});

async function getFactionEntityBySlug(slug: string) {
  return prisma.entity.findUnique({
    where: { slug },
  });
}

app.get("/:slug", zValidator("param", slugParamSchema), async (c) => {
  const { slug } = c.req.valid("param");

  const entity = await getFactionEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.FACTION) {
    return c.json({ error: "entity is not a faction" }, 400);
  }

  const details = await prisma.factionDetails.findUnique({
    where: { entityId: entity.id },
  });

  if (!details) {
    return c.json({ error: "faction details not found" }, 404);
  }

  return c.json(details, 200);
});

app.post("/", zValidator("json", factionDetailsSchema), async (c) => {
  const {
    slug,
    factionType,
    ideology,
    goal,
    reputation,
    influenceLevel,
    wealthLevel,
    foundedYear,
  } = c.req.valid("json");

  const entity = await getFactionEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.FACTION) {
    return c.json({ error: "entity is not a faction" }, 400);
  }

  try {
    const details = await prisma.factionDetails.create({
      data: {
        entityId: entity.id,
        factionType,
        ideology,
        goal,
        reputation,
        influenceLevel,
        wealthLevel,
        foundedYear,
      },
    });

    return c.json(details, 201);
  } catch (e: unknown) {
    if (
      e &&
      typeof e === "object" &&
      "code" in e &&
      (e as { code?: string }).code === "P2002"
    ) {
      return c.json({ error: "faction details already exist" }, 409);
    }

    throw e;
  }
});

app.patch(
  "/:slug",
  zValidator("param", slugParamSchema),
  zValidator("json", patchFactionDetailsSchema),
  async (c) => {
    const { slug } = c.req.valid("param");
    const updates = c.req.valid("json");

    const entity = await getFactionEntityBySlug(slug);

    if (!entity) {
      return c.json({ error: "entity not found" }, 404);
    }

    if (entity.type !== EntityType.FACTION) {
      return c.json({ error: "entity is not a faction" }, 400);
    }

    try {
      const details = await prisma.factionDetails.update({
        where: { entityId: entity.id },
        data: {
          ...updates,
        },
      });

      return c.json(details, 200);
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "code" in e &&
        (e as { code?: string }).code === "P2025"
      ) {
        return c.json({ error: "faction details not found" }, 404);
      }

      throw e;
    }
  },
);
