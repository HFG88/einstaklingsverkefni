import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Layout } from "../../components/Layout/Layout";
import { EntityHero } from "../../components/EntityHero/EntityHero";
import { EntityTypedDetails } from "../../components/EntityTypedDetails/EntityTypedDetails";
import { EntityRelationHighlights } from "../../components/EntityRelationHiglights/EntityRelationHiglights";
import "./EntityDetailPage.css";
import type {
  EntityTypeLower,
  EntityWithDetailsAndRelations,
} from "../../types/entity";

const API_URL = import.meta.env.VITE_API_URL;

export function EntityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [entity, setEntity] = useState<EntityWithDetailsAndRelations | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    fetch(`${API_URL}/entities/${slug}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load entity.");
        }
        return res.json();
      })
      .then((data: EntityWithDetailsAndRelations) => {
        setEntity(data);
        setError(null);
      })
      .catch(() => {
        setError("Failed to load entity.");
      });
  }, [slug]);

  async function handleDelete() {
    if (!entity) return;

    const confirmed = window.confirm(`Delete "${entity.name}"?`);
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(`${API_URL}/entities/${entity.slug}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "Failed to delete entity.");
        setIsDeleting(false);
        return;
      }

      navigate(`/entities/${entity.type.toLowerCase() as EntityTypeLower}`);
    } catch {
      alert("Something went wrong while deleting the entity.");
      setIsDeleting(false);
    }
  }

  if (error) {
    return (
      <Layout>
        <section className="entity-detail-page">
          <div className="panel entity-detail-page__loading">
            <p>{error}</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!entity) {
    return (
      <Layout>
        <section className="entity-detail-page">
          <div className="panel entity-detail-page__loading">
            <p>Loading...</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="entity-detail-page">
        <EntityHero
          entity={entity}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />

        {entity.longDescription?.trim() && (
          <section className="panel entity-long-description">
            <h2>Details</h2>
            <p>{entity.longDescription}</p>
          </section>
        )}

        <EntityTypedDetails entity={entity} />
        <EntityRelationHighlights entity={entity} />
      </section>
    </Layout>
  );
}
