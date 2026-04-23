import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { app as entitiesAPI } from "./routes/entities.api.js";
import { app as entityRelationsAPI } from "./routes/entityrelations.api.js";
import { app as characterDetailsAPI } from "./routes/characterdetails.api.js";
import { app as locationDetailsAPI } from "./routes/locationdetails.api.js";
import { app as eventDetailsAPI } from "./routes/eventdetails.api.js";
import { app as factionDetailsAPI } from "./routes/factiondetails.api.js";

import { EntityType, RelationType } from "../prisma/generated/client.js";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.json({
    name: "Worldbuilder API",
    version: "1.0.0",
    endpoints: {
      entities: [
        {
          method: "GET",
          path: "/entities",
          description: "Get all entities",
          query: {
            type: "Optional entity type filter (CHARACTER, LOCATION, FACTION, EVENT, NOTE)",
          },
          completed: true,
        },
        {
          method: "GET",
          path: "/entities/random",
          description: "Get a random entity",
          query: {
            type: "Optional entity type filter (CHARACTER, LOCATION, FACTION, EVENT, NOTE)",
          },
          completed: true,
        },
        {
          method: "GET",
          path: "/entities/:slug",
          description:
            "Get a single entity by slug, including relations and matching detail record",
          response: {
            entity: "Entity object",
            outgoingRelations: "Relations from this entity",
            incomingRelations: "Relations to this entity",
            characterDetails: "Included if entity is a character",
            locationDetails: "Included if entity is a location",
            factionDetails: "Included if entity is a faction",
            eventDetails: "Included if entity is an event",
          },
          completed: true,
        },
        {
          method: "POST",
          path: "/entities",
          description: "Create a new entity",
          body: {
            name: "string",
            description: "string?",
            longDescription: "string?",
            imageUrl: "string?",
            type: "EntityType",
          },
          completed: true,
        },
        {
          method: "PATCH",
          path: "/entities/:slug",
          description: "Update an entity by slug",
          body: {
            name: "string?",
            description: "string?",
            longDescription: "string?",
            imageUrl: "string?",
            type: "EntityType?",
          },
          completed: true,
        },
        {
          method: "DELETE",
          path: "/entities/:slug",
          description: "Delete an entity by slug",
          completed: true,
        },
      ],

      entityRelations: [
        {
          method: "GET",
          path: "/entity-relations",
          description: "Get all entity relations",
          completed: true,
        },
        {
          method: "POST",
          path: "/entity-relations",
          description: "Create a relation between two entities",
          body: {
            fromSlug: "string",
            toSlug: "string",
            relation: "RelationType",
          },
          completed: true,
        },
        {
          method: "DELETE",
          path: "/entity-relations",
          description: "Delete a relation between two entities",
          body: {
            fromSlug: "string",
            toSlug: "string",
            relation: "RelationType",
          },
          completed: true,
        },
      ],

      characterDetails: [
        {
          method: "GET",
          path: "/character-details/:slug",
          description: "Get character details for a character entity",
          completed: true,
        },
        {
          method: "POST",
          path: "/character-details",
          description: "Create character details for a character entity",
          body: {
            slug: "string",
            race: "string?",
            role: "string?",
            profession: "string?",
            status: "string?",
            age: "number?",
            gender: "string?",
            alignment: "string?",
            title: "string?",
          },
          completed: true,
        },
        {
          method: "PATCH",
          path: "/character-details/:slug",
          description: "Update character details by entity slug",
          body: {
            race: "string?",
            role: "string?",
            profession: "string?",
            status: "string?",
            age: "number?",
            gender: "string?",
            alignment: "string?",
            title: "string?",
          },
          completed: true,
        },
      ],

      locationDetails: [
        {
          method: "GET",
          path: "/location-details/:slug",
          description: "Get location details for a location entity",
          completed: true,
        },
        {
          method: "POST",
          path: "/location-details",
          description: "Create location details for a location entity",
          body: {
            slug: "string",
            locationType: "string?",
            size: "string?",
            climate: "string?",
            terrain: "string?",
            population: "number?",
            wealthLevel: "string?",
            dangerLevel: "string?",
          },
          completed: true,
        },
        {
          method: "PATCH",
          path: "/location-details/:slug",
          description: "Update location details by entity slug",
          body: {
            locationType: "string?",
            size: "string?",
            climate: "string?",
            terrain: "string?",
            population: "number?",
            wealthLevel: "string?",
            dangerLevel: "string?",
          },
          completed: true,
        },
      ],

      factionDetails: [
        {
          method: "GET",
          path: "/faction-details/:slug",
          description: "Get faction details for a faction entity",
          completed: true,
        },
        {
          method: "POST",
          path: "/faction-details",
          description: "Create faction details for a faction entity",
          body: {
            slug: "string",
            factionType: "string?",
            ideology: "string?",
            goal: "string?",
            reputation: "string?",
            influenceLevel: "string?",
            wealthLevel: "string?",
            foundedYear: "number?",
          },
          completed: true,
        },
        {
          method: "PATCH",
          path: "/faction-details/:slug",
          description: "Update faction details by entity slug",
          body: {
            factionType: "string?",
            ideology: "string?",
            goal: "string?",
            reputation: "string?",
            influenceLevel: "string?",
            wealthLevel: "string?",
            foundedYear: "number?",
          },
          completed: true,
        },
      ],

      eventDetails: [
        {
          method: "GET",
          path: "/event-details/:slug",
          description: "Get event details for an event entity",
          completed: true,
        },
        {
          method: "POST",
          path: "/event-details",
          description: "Create event details for an event entity",
          body: {
            slug: "string",
            eventType: "string?",
            date: "string?",
            outcome: "string?",
            significance: "string?",
          },
          completed: true,
        },
        {
          method: "PATCH",
          path: "/event-details/:slug",
          description: "Update event details by entity slug",
          body: {
            eventType: "string?",
            date: "string?",
            outcome: "string?",
            significance: "string?",
          },
          completed: true,
        },
      ],

      utility: [
        {
          method: "GET",
          path: "/entity-types",
          description: "Get all available entity types",
          completed: true,
        },
        {
          method: "GET",
          path: "/relation-types",
          description: "Get all available relation types",
          completed: true,
        },
      ],
    },
  });
});

app.get("/entity-types", (c) => {
  return c.json(Object.values(EntityType));
});

app.get("/relation-types", (c) => {
  return c.json(Object.values(RelationType));
});

app.route("/entities", entitiesAPI);
app.route("/entity-relations", entityRelationsAPI);
app.route("/character-details", characterDetailsAPI);
app.route("/location-details", locationDetailsAPI);
app.route("/event-details", eventDetailsAPI);
app.route("/faction-details", factionDetailsAPI);

const port = Number(process.env.PORT) || 3000;

serve(
  {
    fetch: app.fetch,
    port,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
