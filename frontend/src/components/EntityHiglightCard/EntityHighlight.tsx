import { useEffect, useState } from "react";
import { Link } from "react-router";
import fallbackEntity from "../../assets/fallback-entity.png";
import "./RandomEntityHighlight.css";
import type { EntityListItem, EntityTypeLower } from "../../types/entity";

const API_URL = import.meta.env.VITE_API_URL;

export function RandomEntityHighlight() {
  const [entity, setEntity] = useState<EntityListItem | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/entities/random`)
      .then((res) => res.json())
      .then((data: EntityListItem) => setEntity(data));
  }, []);

  if (!entity) {
    return <p>Loading highlight...</p>;
  }

  const imageSrc = entity.imageUrl?.trim() ? entity.imageUrl : fallbackEntity;

  return (
    <div className="highlight">
      <h2>Featured</h2>

      <Link
        to={`/entities/${entity.type.toLowerCase() as EntityTypeLower}/${entity.slug}`}
        className="highlight__link"
      >
        <div className="highlight__image-wrapper">
          <img src={imageSrc} alt={entity.name} />
          <div className="highlight__overlay" />
          <h3 className="highlight__title">{entity.name}</h3>
        </div>
      </Link>

      <p className="highlight__description">
        {entity.description?.trim()
          ? entity.description
          : "No description available."}
      </p>
    </div>
  );
}
