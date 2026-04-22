import type { RelationType } from "./relation";

export type EntityType =
  | "CHARACTER"
  | "LOCATION"
  | "FACTION"
  | "EVENT"
  | "NOTE";

export type EntityTypeLower =
  | "character"
  | "location"
  | "faction"
  | "event"
  | "note";

export type BaseEntity = {
  id?: number;
  slug: string;
  name: string;
  type: EntityType;
  description?: string | null;
  longDescription?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type EntityOption = {
  slug: string;
  name: string;
  type: EntityType;
};

export type RelatedEntity = {
  id: number;
  slug: string;
  name: string;
  type: EntityType;
  description?: string | null;
  imageUrl?: string | null;
};

export type EntityRelation = {
  id: number;
  fromId: number;
  toId: number;
  relation: RelationType;
  createdAt?: string;
  from: RelatedEntity;
  to: RelatedEntity;
};

export type CharacterDetails = {
  entityId?: number;
  race?: string | null;
  role?: string | null;
  profession?: string | null;
  status?: string | null;
  age?: number | null;
  gender?: string | null;
  alignment?: string | null;
  title?: string | null;
};

export type LocationDetails = {
  entityId?: number;
  locationType?: string | null;
  size?: string | null;
  climate?: string | null;
  terrain?: string | null;
  population?: number | null;
  wealthLevel?: string | null;
  dangerLevel?: string | null;
};

export type EventDetails = {
  entityId?: number;
  eventType?: string | null;
  date?: string | null;
  outcome?: string | null;
  significance?: string | null;
};

export type FactionDetails = {
  entityId?: number;
  factionType?: string | null;
  ideology?: string | null;
  goal?: string | null;
  reputation?: string | null;
  influenceLevel?: string | null;
  wealthLevel?: string | null;
  foundedYear?: number | null;
};

export type EntityWithDetailsAndRelations = BaseEntity & {
  outgoingRelations?: EntityRelation[];
  incomingRelations?: EntityRelation[];
  characterDetails?: CharacterDetails | null;
  locationDetails?: LocationDetails | null;
  eventDetails?: EventDetails | null;
  factionDetails?: FactionDetails | null;
};

export type CreatedOrUpdatedEntityResponse = {
  slug: string;
  type: EntityType;
  error?: string;
};

export type EntityListItem = {
  id: number;
  slug: string;
  name: string;
  type: EntityType;
  description?: string | null;
  imageUrl?: string | null;
};
