import { Link } from "react-router";
import "./EntityRelationHighlights.css";
import type {
  EntityRelation,
  EntityWithDetailsAndRelations,
  RelatedEntity,
} from "../../types/entity";

type Props = {
  entity: EntityWithDetailsAndRelations;
};

export function EntityRelationHighlights({ entity }: Props) {
  const homeRelation = entity.outgoingRelations?.find(
    (rel: EntityRelation) => rel.relation === "LIVES_IN",
  );

  const currentLocationRelation = entity.outgoingRelations?.find(
    (rel: EntityRelation) => rel.relation === "LOCATED_IN",
  );

  const occursInRelation = entity.outgoingRelations?.find(
    (rel: EntityRelation) => rel.relation === "OCCURS_IN",
  );

  const memberOfRelations =
    entity.outgoingRelations?.filter(
      (rel: EntityRelation) => rel.relation === "MEMBER_OF",
    ) ?? [];

  const inhabitants =
    entity.incomingRelations?.filter(
      (rel: EntityRelation) => rel.relation === "LIVES_IN",
    ) ?? [];

  const members =
    entity.incomingRelations?.filter(
      (rel: EntityRelation) => rel.relation === "MEMBER_OF",
    ) ?? [];

  const hasAnything =
    !!homeRelation ||
    !!currentLocationRelation ||
    !!occursInRelation ||
    memberOfRelations.length > 0 ||
    inhabitants.length > 0 ||
    members.length > 0;

  if (!hasAnything) return null;

  return (
    <section className="entity-highlights panel">
      <header className="entity-highlights__header">
        <h2>Connections</h2>
        <p>How this entry fits into the wider world.</p>
      </header>

      <div className="entity-highlights__grid">
        {homeRelation && (
          <RelationSpotlight
            title="Home"
            subtitle="Place of residence"
            relatedEntity={homeRelation.to}
          />
        )}

        {currentLocationRelation && (
          <RelationSpotlight
            title="Current Location"
            subtitle="Where they are now"
            relatedEntity={currentLocationRelation.to}
          />
        )}

        {occursInRelation && (
          <RelationSpotlight
            title="Occurs In"
            subtitle="Primary setting"
            relatedEntity={occursInRelation.to}
          />
        )}
      </div>

      {memberOfRelations.length > 0 && (
        <RelationGroup
          title="Affiliations"
          subtitle="Organizations and groups tied to this entry"
          entities={memberOfRelations.map((rel) => rel.to)}
        />
      )}

      {inhabitants.length > 0 && (
        <RelationGroup
          title="Inhabitants"
          subtitle="People known to live here"
          entities={inhabitants.map((rel) => rel.from)}
        />
      )}

      {members.length > 0 && (
        <RelationGroup
          title="Members"
          subtitle="People associated with this faction"
          entities={members.map((rel) => rel.from)}
        />
      )}
    </section>
  );
}

type RelationSpotlightProps = {
  title: string;
  subtitle?: string;
  relatedEntity: RelatedEntity;
};

function RelationSpotlight({
  title,
  subtitle,
  relatedEntity,
}: RelationSpotlightProps) {
  return (
    <section className="relation-spotlight">
      <div className="relation-spotlight__meta">
        <span className="relation-spotlight__label">{title}</span>
        {subtitle && <p className="relation-spotlight__subtitle">{subtitle}</p>}
      </div>

      <Link
        to={`/entities/${relatedEntity.type.toLowerCase()}/${relatedEntity.slug}`}
        className="relation-spotlight__card"
      >
        <h3>{relatedEntity.name}</h3>
        <p>
          {relatedEntity.description?.trim()
            ? relatedEntity.description
            : "No description recorded yet."}
        </p>
      </Link>
    </section>
  );
}

type RelationGroupProps = {
  title: string;
  subtitle?: string;
  entities: RelatedEntity[];
};

function RelationGroup({ title, subtitle, entities }: RelationGroupProps) {
  return (
    <section className="relation-group">
      <div className="relation-group__meta">
        <span className="relation-group__label">{title}</span>
        {subtitle && <p className="relation-group__subtitle">{subtitle}</p>}
      </div>

      <div className="relation-group__grid">
        {entities.map((relatedEntity) => (
          <Link
            key={relatedEntity.slug}
            to={`/entities/${relatedEntity.type.toLowerCase()}/${relatedEntity.slug}`}
            className="relation-group__card"
          >
            <h3>{relatedEntity.name}</h3>
            <p>
              {relatedEntity.description?.trim()
                ? relatedEntity.description
                : "No description recorded yet."}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
