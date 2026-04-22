import { Hono } from "hono";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../prisma.js";
import { EntityType } from "../../prisma/generated/client.js";

export const app = new Hono();

const slugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

const locationDetailsSchema = z.object({
  slug: z.string().trim().min(1),
  locationType: z.string().trim().max(100).optional(),
  size: z.string().trim().max(100).optional(),
  climate: z.string().trim().max(100).optional(),
  terrain: z.string().trim().max(100).optional(),
  population: z.coerce.number().int().min(0).max(100000000).optional(),
  wealthLevel: z.string().trim().max(100).optional(),
  dangerLevel: z.string().trim().max(100).optional(),
});

const patchLocationDetailsSchema = z.object({
  locationType: z.string().trim().max(100).optional(),
  size: z.string().trim().max(100).optional(),
  climate: z.string().trim().max(100).optional(),
  terrain: z.string().trim().max(100).optional(),
  population: z.coerce.number().int().min(0).max(100000000).optional(),
  wealthLevel: z.string().trim().max(100).optional(),
  dangerLevel: z.string().trim().max(100).optional(),
});

async function getLocationEntityBySlug(slug: string) {
  return prisma.entity.findUnique({
    where: { slug },
  });
}

app.get("/:slug", zValidator("param", slugParamSchema), async (c) => {
  const { slug } = c.req.valid("param");

  const entity = await getLocationEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.LOCATION) {
    return c.json({ error: "entity is not a location" }, 400);
  }

  const details = await prisma.locationDetails.findUnique({
    where: { entityId: entity.id },
  });

  if (!details) {
    return c.json({ error: "location details not found" }, 404);
  }

  return c.json(details, 200);
});

app.post("/", zValidator("json", locationDetailsSchema), async (c) => {
  const {
    slug,
    locationType,
    size,
    climate,
    terrain,
    population,
    wealthLevel,
    dangerLevel,
  } = c.req.valid("json");

  const entity = await getLocationEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.LOCATION) {
    return c.json({ error: "entity is not a location" }, 400);
  }

  try {
    const details = await prisma.locationDetails.create({
      data: {
        entityId: entity.id,
        locationType,
        size,
        climate,
        terrain,
        population,
        wealthLevel,
        dangerLevel,
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
      return c.json({ error: "location details already exist" }, 409);
    }

    throw e;
  }
});

app.patch(
  "/:slug",
  zValidator("param", slugParamSchema),
  zValidator("json", patchLocationDetailsSchema),
  async (c) => {
    const { slug } = c.req.valid("param");
    const updates = c.req.valid("json");

    const entity = await getLocationEntityBySlug(slug);

    if (!entity) {
      return c.json({ error: "entity not found" }, 404);
    }

    if (entity.type !== EntityType.LOCATION) {
      return c.json({ error: "entity is not a location" }, 400);
    }

    try {
      const details = await prisma.locationDetails.update({
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
        return c.json({ error: "location details not found" }, 404);
      }

      throw e;
    }
  },
);
