import { Link } from "react-router";
import fallbackEntity from "../../assets/fallback-entity.png";
import "./EntityHero.css";
import type {
  EntityWithDetailsAndRelations,
  EntityTypeLower,
} from "../../types/entity";

type Props = {
  entity: EntityWithDetailsAndRelations;
  onDelete: () => void;
  isDeleting?: boolean;
};

export function EntityHero({ entity, onDelete, isDeleting = false }: Props) {
  const imageSrc = entity.imageUrl?.trim() ? entity.imageUrl : fallbackEntity;

  return (
    <header className="panel entity-hero">
      <div className="entity-hero__image-wrapper">
        <img src={imageSrc} alt={entity.name} className="entity-hero__image" />
        <div className="entity-hero__overlay" />

        <div className="entity-hero__content">
          <p className="entity-hero__type">{entity.type}</p>

          <h1 className="entity-hero__title">{entity.name}</h1>

          <p className="entity-hero__description">
            {entity.description?.trim()
              ? entity.description
              : "No description yet."}
          </p>

          <div className="entity-hero__actions">
            <Link
              to={`/edit/${entity.type.toLowerCase() as EntityTypeLower}/${entity.slug}`}
              className="form-button"
            >
              Edit
            </Link>

            <button
              type="button"
              className="form-button form-button--danger entity-hero__delete"
              onClick={onDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
