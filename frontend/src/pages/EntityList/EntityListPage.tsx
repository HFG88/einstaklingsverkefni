import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./EntityListPage.css";
import { Layout } from "../../components/Layout/Layout";
import { EntityCard } from "../../components/EntityCard/EntityCard";
import { entityTypeConfig } from "../../config/EntityTypeConfig";
import type {
  EntityListItem,
  EntityType,
  EntityTypeLower,
} from "../../types/entity";

const API_URL = import.meta.env.VITE_API_URL;

export function EntityListPage() {
  const { type } = useParams<{ type: EntityTypeLower }>();
  const [entities, setEntities] = useState<EntityListItem[]>([]);

  const normalizedType = type?.toUpperCase() as EntityType | undefined;
  const config = normalizedType ? entityTypeConfig[normalizedType] : undefined;

  useEffect(() => {
    if (!type) return;

    fetch(`${API_URL}/entities?type=${type}`)
      .then((res) => res.json())
      .then((data: EntityListItem[]) => {
        setEntities(data);
      });
  }, [type]);

  function handleDelete(slug: string) {
    setEntities((current) => current.filter((entity) => entity.slug !== slug));
  }

  return (
    <Layout>
      <section className="entity-list-page">
        <header className="entity-list-page__header panel">
          <div>
            <h1>{config?.label ?? type}</h1>
            <p>
              Browse all {config?.label?.toLowerCase() ?? type} in your world.
            </p>
          </div>
        </header>

        {entities.length === 0 ? (
          <section className="panel entity-list-page__empty">
            <h2>No entries yet</h2>
            <p>There are no {config?.label?.toLowerCase() ?? type} yet.</p>
          </section>
        ) : (
          <section className="entity-list-page__grid">
            {entities.map((entity) => (
              <EntityCard
                key={entity.id}
                entity={entity}
                type={type!}
                onDelete={handleDelete}
              />
            ))}
          </section>
        )}
      </section>
    </Layout>
  );
}
