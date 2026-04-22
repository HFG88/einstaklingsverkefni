import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import { Layout } from "../../components/Layout/Layout";
import { CharacterFields } from "../../components/CharacterFields/CharacterFields";
import { CharacterRelationFields } from "../../components/CharacterRelationFields/CharacterRelationFields";
import { LocationFields } from "../../components/LocationFields/LocationFields";
import { LocationRelationFields } from "../../components/LocationRelationFields/LocationRelationFields";
import { EventFields } from "../../components/EventFields/EventFields";
import { EventRelationFields } from "../../components/EventRelationFields/EventRelationFields";
import { FactionFields } from "../../components/FactionFields/FactionFields";
import { FactionRelationFields } from "../../components/FactionRelationFields/FactionRelationFields";
import "../CreateEntity/createentitypage.css";
import type {
  CreatedOrUpdatedEntityResponse,
  EntityOption,
  EntityRelation,
  EntityTypeLower,
  EntityWithDetailsAndRelations,
} from "../../types/entity";
import type { RelationType } from "../../types/relation";

const API_URL = import.meta.env.VITE_API_URL;

export function EditEntityPage() {
  const { type, slug } = useParams<{ type: EntityTypeLower; slug: string }>();
  const navigate = useNavigate();

  const [entityOptions, setEntityOptions] = useState<EntityOption[]>([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [race, setRace] = useState("");
  const [role, setRole] = useState("");
  const [profession, setProfession] = useState("");
  const [status, setStatus] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [alignment, setAlignment] = useState("");
  const [title, setTitle] = useState("");

  const [locationType, setLocationType] = useState("");
  const [size, setSize] = useState("");
  const [climate, setClimate] = useState("");
  const [terrain, setTerrain] = useState("");
  const [population, setPopulation] = useState("");
  const [wealthLevel, setWealthLevel] = useState("");
  const [dangerLevel, setDangerLevel] = useState("");

  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [outcome, setOutcome] = useState("");
  const [significance, setSignificance] = useState("");

  const [factionType, setFactionType] = useState("");
  const [ideology, setIdeology] = useState("");
  const [goal, setGoal] = useState("");
  const [reputation, setReputation] = useState("");
  const [influenceLevel, setInfluenceLevel] = useState("");
  const [factionWealthLevel, setFactionWealthLevel] = useState("");
  const [foundedYear, setFoundedYear] = useState("");

  const [homeSlug, setHomeSlug] = useState("");
  const [occursInSlug, setOccursInSlug] = useState("");
  const [inhabitantSlugs, setInhabitantSlugs] = useState<string[]>([]);
  const [memberSlugs, setMemberSlugs] = useState<string[]>([]);

  const [initialHomeSlug, setInitialHomeSlug] = useState("");
  const [initialOccursInSlug, setInitialOccursInSlug] = useState("");
  const [initialInhabitantSlugs, setInitialInhabitantSlugs] = useState<
    string[]
  >([]);
  const [initialMemberSlugs, setInitialMemberSlugs] = useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const headingType = type
    ? type.charAt(0).toUpperCase() + type.slice(1)
    : "Entity";

  const locations = entityOptions.filter(
    (entity) => entity.type === "LOCATION",
  );
  const characters = entityOptions.filter(
    (entity) => entity.type === "CHARACTER",
  );

  useEffect(() => {
    const load = async () => {
      if (!slug) return;

      try {
        const [entityRes, entitiesRes] = await Promise.all([
          fetch(`${API_URL}/entities/${slug}`),
          fetch(`${API_URL}/entities`),
        ]);

        const entityData: EntityWithDetailsAndRelations =
          await entityRes.json();
        const entitiesData: EntityOption[] = await entitiesRes.json();

        setEntityOptions(entitiesData);

        setName(entityData.name ?? "");
        setDescription(entityData.description ?? "");
        setLongDescription(entityData.longDescription ?? "");
        setImageUrl(entityData.imageUrl ?? "");

        setRace(entityData.characterDetails?.race ?? "");
        setRole(entityData.characterDetails?.role ?? "");
        setProfession(entityData.characterDetails?.profession ?? "");
        setStatus(entityData.characterDetails?.status ?? "");
        setAge(
          entityData.characterDetails?.age !== null &&
            entityData.characterDetails?.age !== undefined
            ? String(entityData.characterDetails.age)
            : "",
        );
        setGender(entityData.characterDetails?.gender ?? "");
        setAlignment(entityData.characterDetails?.alignment ?? "");
        setTitle(entityData.characterDetails?.title ?? "");

        setLocationType(entityData.locationDetails?.locationType ?? "");
        setSize(entityData.locationDetails?.size ?? "");
        setClimate(entityData.locationDetails?.climate ?? "");
        setTerrain(entityData.locationDetails?.terrain ?? "");
        setPopulation(
          entityData.locationDetails?.population !== null &&
            entityData.locationDetails?.population !== undefined
            ? String(entityData.locationDetails.population)
            : "",
        );
        setWealthLevel(entityData.locationDetails?.wealthLevel ?? "");
        setDangerLevel(entityData.locationDetails?.dangerLevel ?? "");

        setEventType(entityData.eventDetails?.eventType ?? "");
        setDate(entityData.eventDetails?.date ?? "");
        setOutcome(entityData.eventDetails?.outcome ?? "");
        setSignificance(entityData.eventDetails?.significance ?? "");

        setFactionType(entityData.factionDetails?.factionType ?? "");
        setIdeology(entityData.factionDetails?.ideology ?? "");
        setGoal(entityData.factionDetails?.goal ?? "");
        setReputation(entityData.factionDetails?.reputation ?? "");
        setInfluenceLevel(entityData.factionDetails?.influenceLevel ?? "");
        setFactionWealthLevel(entityData.factionDetails?.wealthLevel ?? "");
        setFoundedYear(
          entityData.factionDetails?.foundedYear !== null &&
            entityData.factionDetails?.foundedYear !== undefined
            ? String(entityData.factionDetails.foundedYear)
            : "",
        );

        const loadedHomeSlug =
          entityData.outgoingRelations?.find(
            (rel: EntityRelation) => rel.relation === "LIVES_IN",
          )?.to.slug ?? "";
        setHomeSlug(loadedHomeSlug);
        setInitialHomeSlug(loadedHomeSlug);

        const loadedOccursInSlug =
          entityData.outgoingRelations?.find(
            (rel: EntityRelation) => rel.relation === "OCCURS_IN",
          )?.to.slug ?? "";
        setOccursInSlug(loadedOccursInSlug);
        setInitialOccursInSlug(loadedOccursInSlug);

        const loadedInhabitants =
          entityData.incomingRelations
            ?.filter((rel: EntityRelation) => rel.relation === "LIVES_IN")
            .map((rel: EntityRelation) => rel.from.slug) ?? [];
        setInhabitantSlugs(loadedInhabitants);
        setInitialInhabitantSlugs(loadedInhabitants);

        const loadedMembers =
          entityData.incomingRelations
            ?.filter((rel: EntityRelation) => rel.relation === "MEMBER_OF")
            .map((rel: EntityRelation) => rel.from.slug) ?? [];
        setMemberSlugs(loadedMembers);
        setInitialMemberSlugs(loadedMembers);

        setIsLoading(false);
      } catch {
        setError("Failed to load entity.");
        setIsLoading(false);
      }
    };

    load();
  }, [slug]);

  async function patchCharacterDetails(entitySlug: string) {
    const payload = {
      race: race.trim() || undefined,
      role: role.trim() || undefined,
      profession: profession.trim() || undefined,
      status: status.trim() || undefined,
      age: age.trim() ? Number(age) : undefined,
      gender: gender.trim() || undefined,
      alignment: alignment.trim() || undefined,
      title: title.trim() || undefined,
    };

    const res = await fetch(`${API_URL}/character-details/${entitySlug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
  }

  async function patchLocationDetails(entitySlug: string) {
    const payload = {
      locationType: locationType.trim() || undefined,
      size: size.trim() || undefined,
      climate: climate.trim() || undefined,
      terrain: terrain.trim() || undefined,
      population: population.trim() ? Number(population) : undefined,
      wealthLevel: wealthLevel.trim() || undefined,
      dangerLevel: dangerLevel.trim() || undefined,
    };

    const res = await fetch(`${API_URL}/location-details/${entitySlug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
  }

  async function patchEventDetails(entitySlug: string) {
    const payload = {
      eventType: eventType.trim() || undefined,
      date: date.trim() || undefined,
      outcome: outcome.trim() || undefined,
      significance: significance.trim() || undefined,
    };

    const res = await fetch(`${API_URL}/event-details/${entitySlug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
  }

  async function patchFactionDetails(entitySlug: string) {
    const payload = {
      factionType: factionType.trim() || undefined,
      ideology: ideology.trim() || undefined,
      goal: goal.trim() || undefined,
      reputation: reputation.trim() || undefined,
      influenceLevel: influenceLevel.trim() || undefined,
      wealthLevel: factionWealthLevel.trim() || undefined,
      foundedYear: foundedYear.trim() ? Number(foundedYear) : undefined,
    };

    const res = await fetch(`${API_URL}/faction-details/${entitySlug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.ok;
  }

  async function postRelation(
    fromSlug: string,
    toSlug: string,
    relation: RelationType,
  ) {
    const res = await fetch(`${API_URL}/entity-relations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromSlug, toSlug, relation }),
    });

    return res.ok;
  }

  async function deleteRelation(
    fromSlug: string,
    toSlug: string,
    relation: RelationType,
  ) {
    const res = await fetch(`${API_URL}/entity-relations`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fromSlug, toSlug, relation }),
    });

    return res.ok;
  }

  async function syncSingleRelation(
    fromSlug: string,
    relation: RelationType,
    initialToSlug: string,
    currentToSlug: string,
  ) {
    if (initialToSlug === currentToSlug) return true;

    if (initialToSlug) {
      const deleted = await deleteRelation(fromSlug, initialToSlug, relation);
      if (!deleted) return false;
    }

    if (currentToSlug) {
      const created = await postRelation(fromSlug, currentToSlug, relation);
      if (!created) return false;
    }

    return true;
  }

  async function syncMultiRelation(
    relation: RelationType,
    initialSlugs: string[],
    currentSlugs: string[],
    makeFromTo: (slugValue: string) => { fromSlug: string; toSlug: string },
  ) {
    const initialSet = new Set(initialSlugs);
    const currentSet = new Set(currentSlugs);

    const removed = initialSlugs.filter(
      (slugValue) => !currentSet.has(slugValue),
    );
    const added = currentSlugs.filter(
      (slugValue) => !initialSet.has(slugValue),
    );

    for (const slugValue of removed) {
      const { fromSlug, toSlug } = makeFromTo(slugValue);
      const ok = await deleteRelation(fromSlug, toSlug, relation);
      if (!ok) return false;
    }

    for (const slugValue of added) {
      const { fromSlug, toSlug } = makeFromTo(slugValue);
      const ok = await postRelation(fromSlug, toSlug, relation);
      if (!ok) return false;
    }

    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!slug) {
      setError("Missing entity slug.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = {
      name,
      description: description.trim() || undefined,
      longDescription: longDescription.trim() || undefined,
      imageUrl: imageUrl.trim() || undefined,
    };

    try {
      const entityRes = await fetch(`${API_URL}/entities/${slug}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const updatedEntity: CreatedOrUpdatedEntityResponse =
        await entityRes.json();

      if (!entityRes.ok) {
        setError(updatedEntity.error ?? "Failed to update entity.");
        setIsSubmitting(false);
        return;
      }

      let detailsOk = true;
      let relationsOk = true;

      if (type === "character") {
        detailsOk = await patchCharacterDetails(slug);
        if (detailsOk) {
          relationsOk = await syncSingleRelation(
            slug,
            "LIVES_IN",
            initialHomeSlug,
            homeSlug,
          );
        }
      }

      if (type === "location") {
        detailsOk = await patchLocationDetails(slug);
        if (detailsOk) {
          relationsOk = await syncMultiRelation(
            "LIVES_IN",
            initialInhabitantSlugs,
            inhabitantSlugs,
            (characterSlug) => ({
              fromSlug: characterSlug,
              toSlug: slug,
            }),
          );
        }
      }

      if (type === "event") {
        detailsOk = await patchEventDetails(slug);
        if (detailsOk) {
          relationsOk = await syncSingleRelation(
            slug,
            "OCCURS_IN",
            initialOccursInSlug,
            occursInSlug,
          );
        }
      }

      if (type === "faction") {
        detailsOk = await patchFactionDetails(slug);
        if (detailsOk) {
          relationsOk = await syncMultiRelation(
            "MEMBER_OF",
            initialMemberSlugs,
            memberSlugs,
            (characterSlug) => ({
              fromSlug: characterSlug,
              toSlug: slug,
            }),
          );
        }
      }

      if (!detailsOk) {
        setError("Entity updated, but details could not be saved.");
        setIsSubmitting(false);
        return;
      }

      if (!relationsOk) {
        setError("Entity updated, but relations could not be saved.");
        setIsSubmitting(false);
        return;
      }

      navigate(`/entities/${type}/${updatedEntity.slug}`);
    } catch {
      setError("Something went wrong while updating.");
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <section className="create-entity-page">
          <div className="panel">
            <p>Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="create-entity-page">
        <header className="create-entity-page__header panel">
          <h1>Edit {headingType}</h1>
          <p>Update this entity’s information.</p>
        </header>

        <form className="create-entity-form panel" onSubmit={handleSubmit}>
          <section className="create-entity-form__section">
            <h2>Basic Info</h2>

            <div className="form-stack">
              <label className="form-field">
                <span>Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className="form-field">
                <span>Image URL</span>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </label>

              <label className="form-field">
                <span>Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </label>

              <label className="form-field">
                <span>Long Description</span>
                <textarea
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  rows={8}
                />
              </label>
            </div>
          </section>

          {type === "character" && (
            <>
              <section className="create-entity-form__section">
                <h2>Character Details</h2>
                <CharacterFields
                  race={race}
                  setRace={setRace}
                  role={role}
                  setRole={setRole}
                  profession={profession}
                  setProfession={setProfession}
                  status={status}
                  setStatus={setStatus}
                  age={age}
                  setAge={setAge}
                  gender={gender}
                  setGender={setGender}
                  alignment={alignment}
                  setAlignment={setAlignment}
                  title={title}
                  setTitle={setTitle}
                />
              </section>

              <section className="create-entity-form__section">
                <h2>Character Relations</h2>
                <CharacterRelationFields
                  locations={locations}
                  homeSlug={homeSlug}
                  setHomeSlug={setHomeSlug}
                />
              </section>
            </>
          )}

          {type === "location" && (
            <>
              <section className="create-entity-form__section">
                <h2>Location Details</h2>
                <LocationFields
                  locationType={locationType}
                  setLocationType={setLocationType}
                  size={size}
                  setSize={setSize}
                  climate={climate}
                  setClimate={setClimate}
                  terrain={terrain}
                  setTerrain={setTerrain}
                  population={population}
                  setPopulation={setPopulation}
                  wealthLevel={wealthLevel}
                  setWealthLevel={setWealthLevel}
                  dangerLevel={dangerLevel}
                  setDangerLevel={setDangerLevel}
                />
              </section>

              <section className="create-entity-form__section">
                <h2>Location Relations</h2>
                <LocationRelationFields
                  characters={characters}
                  inhabitantSlugs={inhabitantSlugs}
                  setInhabitantSlugs={setInhabitantSlugs}
                />
              </section>
            </>
          )}

          {type === "event" && (
            <>
              <section className="create-entity-form__section">
                <h2>Event Details</h2>
                <EventFields
                  eventType={eventType}
                  setEventType={setEventType}
                  date={date}
                  setDate={setDate}
                  outcome={outcome}
                  setOutcome={setOutcome}
                  significance={significance}
                  setSignificance={setSignificance}
                />
              </section>

              <section className="create-entity-form__section">
                <h2>Event Relations</h2>
                <EventRelationFields
                  locations={locations}
                  occursInSlug={occursInSlug}
                  setOccursInSlug={setOccursInSlug}
                />
              </section>
            </>
          )}

          {type === "faction" && (
            <>
              <section className="create-entity-form__section">
                <h2>Faction Details</h2>
                <FactionFields
                  factionType={factionType}
                  setFactionType={setFactionType}
                  ideology={ideology}
                  setIdeology={setIdeology}
                  goal={goal}
                  setGoal={setGoal}
                  reputation={reputation}
                  setReputation={setReputation}
                  influenceLevel={influenceLevel}
                  setInfluenceLevel={setInfluenceLevel}
                  wealthLevel={factionWealthLevel}
                  setWealthLevel={setFactionWealthLevel}
                  foundedYear={foundedYear}
                  setFoundedYear={setFoundedYear}
                />
              </section>

              <section className="create-entity-form__section">
                <h2>Faction Relations</h2>
                <FactionRelationFields
                  characters={characters}
                  memberSlugs={memberSlugs}
                  setMemberSlugs={setMemberSlugs}
                />
              </section>
            </>
          )}

          {type === "note" && (
            <section className="create-entity-form__section">
              <h2>Note Details</h2>
              <p>Note-specific fields will go here later.</p>
            </section>
          )}

          {error && <p className="form-error">{error}</p>}

          <div className="create-entity-form__actions">
            <button
              type="submit"
              className="form-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>

            <Link
              to={`/entities/${type}/${slug}`}
              className="form-button form-button--secondary"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </Layout>
  );
}
