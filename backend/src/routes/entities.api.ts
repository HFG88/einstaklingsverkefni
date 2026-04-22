import { Hono } from "hono";
import { prisma } from "../prisma.js";
import { EntityType } from "../../prisma/generated/client.js";
import * as z from "zod";
import { zValidator } from "@hono/zod-validator";

export const app = new Hono();

function parseEntityType(typeParam?: string): EntityType | undefined {
  const normalizedType = typeParam?.toUpperCase();

  return normalizedType &&
    Object.values(EntityType).includes(normalizedType as EntityType)
    ? (normalizedType as EntityType)
    : undefined;
}

async function createUniqueSlug(name: string): Promise<string> {
  const baseSlug = name.trim().toLowerCase().replace(/\s+/g, "-");

  let slug = baseSlug;
  let counter = 2;

  while (await prisma.entity.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

const entitySchema = z.object({
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5000).optional(),
  longDescription: z.string().trim().max(20000).optional(),
  imageUrl: z.url().optional(),
  type: z.enum(EntityType),
});

const slugParamSchema = z.object({
  slug: z.string().trim().min(1),
});

const patchEntitySchema = z.object({
  name: z.string().trim().min(1).max(200).optional(),
  description: z.string().trim().max(5000).optional(),
  longDescription: z.string().trim().max(20000).optional(),
  imageUrl: z.url().optional(),
  type: z.enum(EntityType).optional(),
});

app.get("/", async (c) => {
  const type = parseEntityType(c.req.query("type"));

  const entities = await prisma.entity.findMany({
    where: type ? { type } : undefined,
  });

  return c.json(entities);
});

app.get("/random", async (c) => {
  const type = parseEntityType(c.req.query("type"));

  const count = await prisma.entity.count({
    where: type ? { type } : undefined,
  });

  if (count === 0) {
    return c.json({ error: "No entities found" }, 404);
  }

  const randomIndex = Math.floor(Math.random() * count);

  const entity = await prisma.entity.findFirst({
    where: type ? { type } : undefined,
    skip: randomIndex,
  });

  return c.json(entity);
});

app.get("/:slug", zValidator("param", slugParamSchema), async (c) => {
  const { slug } = c.req.valid("param");

  const entity = await prisma.entity.findUnique({
    where: { slug },
    include: {
      outgoingRelations: {
        include: { to: true },
      },
      incomingRelations: {
        include: { from: true },
      },
      characterDetails: true,
      locationDetails: true,
      factionDetails: true,
      eventDetails: true,
    },
  });

  if (!entity) {
    return c.json({ error: "Not found" }, 404);
  }

  return c.json(entity);
});

app.post("/", zValidator("json", entitySchema), async (c) => {
  const { name, description, longDescription, imageUrl, type } =
    c.req.valid("json");

  const slug = await createUniqueSlug(name);

  try {
    const entity = await prisma.entity.create({
      data: {
        name,
        slug,
        description,
        longDescription,
        imageUrl,
        type,
      },
    });

    return c.json(entity, 201);
  } catch (e: unknown) {
    if (
      e &&
      typeof e === "object" &&
      "code" in e &&
      (e as { code?: string }).code === "P2002"
    ) {
      return c.json({ error: "slug already exists" }, 409);
    }

    throw e;
  }
});

app.patch(
  "/:slug",
  zValidator("param", slugParamSchema),
  zValidator("json", patchEntitySchema),
  async (c) => {
    const { slug } = c.req.valid("param");
    const updates = c.req.valid("json");

    try {
      const entity = await prisma.entity.update({
        where: { slug },
        data: {
          ...updates,
        },
      });

      return c.json(entity, 200);
    } catch (e: unknown) {
      if (
        e &&
        typeof e === "object" &&
        "code" in e &&
        (e as { code?: string }).code === "P2025"
      ) {
        return c.json({ error: "not found" }, 404);
      }

      throw e;
    }
  },
);

app.delete("/:slug", zValidator("param", slugParamSchema), async (c) => {
  const { slug } = c.req.valid("param");

  try {
    await prisma.entity.delete({
      where: { slug },
    });

    return c.body(null, 204);
  } catch (e: unknown) {
    if (
      e &&
      typeof e === "object" &&
      "code" in e &&
      (e as { code?: string }).code === "P2025"
    ) {
      return c.json({ error: "not found" }, 404);
    }

    throw e;
  }
});
