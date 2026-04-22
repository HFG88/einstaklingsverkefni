import { useEffect, useState } from "react";
import type { EntityOption } from "../../types/entity";
import type { RelationType } from "../../types/relation";

const API_URL = import.meta.env.VITE_API_URL;

type Props = {
  currentEntity: EntityOption;
};

export function AddRelationForm({ currentEntity }: Props) {
  const [relationTypes, setRelationTypes] = useState<RelationType[]>([]);
  const [entities, setEntities] = useState<EntityOption[]>([]);
  const [relation, setRelation] = useState<RelationType | "">("");
  const [targetSlug, setTargetSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/relation-types`)
      .then((res) => res.json())
      .then((data: RelationType[]) => setRelationTypes(data))
      .catch(() => {
        setError("Failed to load relation types.");
      });

    fetch(`${API_URL}/entities`)
      .then((res) => res.json())
      .then((data: EntityOption[]) => {
        const filtered = data.filter(
          (entity) => entity.slug !== currentEntity.slug,
        );
        setEntities(filtered);
      })
      .catch(() => {
        setError("Failed to load entities.");
      });
  }, [currentEntity.slug]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = {
      fromSlug: currentEntity.slug,
      toSlug: targetSlug,
      relation,
    };

    try {
      const res = await fetch(`${API_URL}/entity-relations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Failed to add relation.");
        return;
      }

      setSuccess("Relation added successfully.");
      setRelation("");
      setTargetSlug("");
    } catch {
      setError("Something went wrong while adding the relation.");
    }
  }

  return (
    <section className="panel add-relation-form">
      <h2>Add Relation</h2>
      <p>
        Create a new relation from <strong>{currentEntity.name}</strong> to
        another entity.
      </p>

      <form onSubmit={handleSubmit} className="add-relation-form__form">
        <label className="form-field">
          <span>Relation Type</span>
          <select
            value={relation}
            onChange={(e) => setRelation(e.target.value as RelationType | "")}
            required
          >
            <option value="">Select relation</option>
            {relationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="form-field">
          <span>Target Entity</span>
          <select
            value={targetSlug}
            onChange={(e) => setTargetSlug(e.target.value)}
            required
          >
            <option value="">Select entity</option>
            {entities.map((entity) => (
              <option key={entity.slug} value={entity.slug}>
                {entity.name} ({entity.type})
              </option>
            ))}
          </select>
        </label>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <div className="add-relation-form__actions">
          <button type="submit" className="form-button">
            Add Relation
          </button>
        </div>
      </form>
    </section>
  );
}
