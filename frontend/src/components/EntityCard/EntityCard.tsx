import { Link } from "react-router";
import fallbackEntity from "../../assets/fallback-entity.png";
import "./EntityCard.css";
import type { EntityListItem, EntityTypeLower } from "../../types/entity";

type Props = {
  entity: EntityListItem;
  type: EntityTypeLower;
  onDelete?: (slug: string) => void;
};

const API_URL = import.meta.env.VITE_API_URL;

export function EntityCard({ entity, type, onDelete }: Props) {
  const imageSrc = entity.imageUrl?.trim() ? entity.imageUrl : fallbackEntity;

  async function handleDelete() {
    const confirmed = window.confirm(`Delete "${entity.name}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/entities/${entity.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "Failed to delete entity.");
        return;
      }

      onDelete?.(entity.slug);
    } catch {
      alert("Something went wrong while deleting the entity.");
    }
  }

  return (
    <article className="entity-card">
      <button
        type="button"
        className="entity-card__delete"
        onClick={handleDelete}
        aria-label={`Delete ${entity.name}`}
        title={`Delete ${entity.name}`}
      >
        x
      </button>

      <Link
        to={`/entities/${type}/${entity.slug}`}
        className="entity-card__link"
      >
        <div className="entity-card__image-wrapper">
          <img
            src={imageSrc}
            alt={entity.name}
            className="entity-card__image"
          />
          <div className="entity-card__overlay" />
          <h2 className="entity-card__title">{entity.name}</h2>
        </div>

        <div className="entity-card__body">
          <p>
            {entity.description?.trim()
              ? entity.description
              : "No description yet."}
          </p>
        </div>
      </Link>
    </article>
  );
}
