import { Hono } from "hono";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";
import { prisma } from "../prisma.js";
import { EntityType } from "../../prisma/generated/client.js";

export const app = new Hono();

const slugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

const characterDetailsSchema = z.object({
  slug: z.string().trim().min(1),
  race: z.string().trim().max(100).optional(),
  role: z.string().trim().max(100).optional(),
  profession: z.string().trim().max(100).optional(),
  status: z.string().trim().max(100).optional(),
  age: z.coerce.number().int().min(0).max(10000).optional(),
  gender: z.string().trim().max(100).optional(),
  alignment: z.string().trim().max(100).optional(),
  title: z.string().trim().max(100).optional(),
});

const patchCharacterDetailsSchema = z.object({
  race: z.string().trim().max(100).optional(),
  role: z.string().trim().max(100).optional(),
  profession: z.string().trim().max(100).optional(),
  status: z.string().trim().max(100).optional(),
  age: z.coerce.number().int().min(0).max(10000).optional(),
  gender: z.string().trim().max(100).optional(),
  alignment: z.string().trim().max(100).optional(),
  title: z.string().trim().max(100).optional(),
});

async function getCharacterEntityBySlug(slug: string) {
  return prisma.entity.findUnique({
    where: { slug },
  });
}

app.get("/:slug", zValidator("param", slugParamSchema), async (c) => {
  const { slug } = c.req.valid("param");

  const entity = await getCharacterEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.CHARACTER) {
    return c.json({ error: "entity is not a character" }, 400);
  }

  const details = await prisma.characterDetails.findUnique({
    where: { entityId: entity.id },
  });

  if (!details) {
    return c.json({ error: "character details not found" }, 404);
  }

  return c.json(details, 200);
});

app.post("/", zValidator("json", characterDetailsSchema), async (c) => {
  const {
    slug,
    race,
    role,
    profession,
    status,
    age,
    gender,
    alignment,
    title,
  } = c.req.valid("json");

  const entity = await getCharacterEntityBySlug(slug);

  if (!entity) {
    return c.json({ error: "entity not found" }, 404);
  }

  if (entity.type !== EntityType.CHARACTER) {
    return c.json({ error: "entity is not a character" }, 400);
  }

  try {
    const details = await prisma.characterDetails.create({
      data: {
        entityId: entity.id,
        race,
        role,
        profession,
        status,
        age,
        gender,
        alignment,
        title,
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
      return c.json({ error: "character details already exist" }, 409);
    }

    throw e;
  }
});

app.patch(
  "/:slug",
  zValidator("param", slugParamSchema),
  zValidator("json", patchCharacterDetailsSchema),
  async (c) => {
    const { slug } = c.req.valid("param");
    const updates = c.req.valid("json");

    const entity = await getCharacterEntityBySlug(slug);

    if (!entity) {
      return c.json({ error: "entity not found" }, 404);
    }

    if (entity.type !== EntityType.CHARACTER) {
      return c.json({ error: "entity is not a character" }, 400);
    }

    try {
      const details = await prisma.characterDetails.update({
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
        return c.json({ error: "character details not found" }, 404);
      }

      throw e;
    }
  },
);
