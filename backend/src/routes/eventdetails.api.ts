import { Hono } from "hono";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../prisma.js";
import { EntityType } from "../../prisma/generated/client.js";

export const app = new Hono();

const slugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

const eventDetailsSchema = z.object({
  slug: z.string().trim().min(1),
  eventType: z.string().trim().max(100).optional(),
  date: z.string().trim().max(100).optional(),
  outcome: z.string().trim().max(500).optional(),
  significance: z.string().trim().max(100).optional(),
});

const patchEventDetailsSchema = z.object({
  eventType: z.string().trim().max(100).optional(),
  date: z.string().trim().max(100).optional(),
  outcome: z.string().trim().max(500).optional(),
  significance: z.string().trim().max(100).optional(),
});

async function getEventEntityBySlug(slug: string) {
  return prisma.entity.findUnique({
    where: { slug },
  });
}

app.get("/:slug", zValidator("param", slugParamSchema), async (c) => {
  const { slug } = c.req.valid("param");

  const entity = await getEventEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.EVENT) {
    return c.json({ error: "entity is not an event" }, 400);
  }

  const details = await prisma.eventDetails.findUnique({
    where: { entityId: entity.id },
  });

  if (!details) {
    return c.json({ error: "event details not found" }, 404);
  }

  return c.json(details, 200);
});

app.post("/", zValidator("json", eventDetailsSchema), async (c) => {
  const { slug, eventType, date, outcome, significance } = c.req.valid("json");

  const entity = await getEventEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.EVENT) {
    return c.json({ error: "entity is not an event" }, 400);
  }

  try {
    const details = await prisma.eventDetails.create({
      data: {
        entityId: entity.id,
        eventType,
        date,
        outcome,
        significance,
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
      return c.json({ error: "event details already exist" }, 409);
    }

    throw e;
  }
});

app.patch(
  "/:slug",
  zValidator("param", slugParamSchema),
  zValidator("json", patchEventDetailsSchema),
  async (c) => {
    const { slug } = c.req.valid("param");
    const updates = c.req.valid("json");

    const entity = await getEventEntityBySlug(slug);

    if (!entity) {
      return c.json({ error: "entity not found" }, 404);
    }

    if (entity.type !== EntityType.EVENT) {
      return c.json({ error: "entity is not an event" }, 400);
    }

    try {
      const details = await prisma.eventDetails.update({
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
        return c.json({ error: "event details not found" }, 404);
      }

      throw e;
    }
  },
);
