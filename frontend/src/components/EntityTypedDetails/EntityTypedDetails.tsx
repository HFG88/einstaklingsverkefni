import "./EntityTypedDetails.css";
import type { EntityWithDetailsAndRelations } from "../../types/entity";

type Props = {
  entity: EntityWithDetailsAndRelations;
};

export function EntityTypedDetails({ entity }: Props) {
  if (entity.type === "CHARACTER" && entity.characterDetails) {
    return (
      <section className="panel entity-typed-details">
        <h2>Character Details</h2>
        <div className="detail-grid">
          <DetailItem label="Race" value={entity.characterDetails.race} />
          <DetailItem label="Role" value={entity.characterDetails.role} />
          <DetailItem
            label="Profession"
            value={entity.characterDetails.profession}
          />
          <DetailItem label="Status" value={entity.characterDetails.status} />
          <DetailItem label="Age" value={entity.characterDetails.age} />
          <DetailItem label="Gender" value={entity.characterDetails.gender} />
          <DetailItem
            label="Alignment"
            value={entity.characterDetails.alignment}
          />
          <DetailItem label="Title" value={entity.characterDetails.title} />
        </div>
      </section>
    );
  }

  if (entity.type === "LOCATION" && entity.locationDetails) {
    return (
      <section className="panel entity-typed-details">
        <h2>Location Details</h2>
        <div className="detail-grid">
          <DetailItem
            label="Location Type"
            value={entity.locationDetails.locationType}
          />
          <DetailItem label="Size" value={entity.locationDetails.size} />
          <DetailItem label="Climate" value={entity.locationDetails.climate} />
          <DetailItem label="Terrain" value={entity.locationDetails.terrain} />
          <DetailItem
            label="Population"
            value={entity.locationDetails.population}
          />
          <DetailItem
            label="Wealth Level"
            value={entity.locationDetails.wealthLevel}
          />
          <DetailItem
            label="Danger Level"
            value={entity.locationDetails.dangerLevel}
          />
        </div>
      </section>
    );
  }

  if (entity.type === "FACTION" && entity.factionDetails) {
    return (
      <section className="panel entity-typed-details">
        <h2>Faction Details</h2>
        <div className="detail-grid">
          <DetailItem
            label="Faction Type"
            value={entity.factionDetails.factionType}
          />
          <DetailItem label="Ideology" value={entity.factionDetails.ideology} />
          <DetailItem label="Goal" value={entity.factionDetails.goal} />
          <DetailItem
            label="Reputation"
            value={entity.factionDetails.reputation}
          />
          <DetailItem
            label="Influence"
            value={entity.factionDetails.influenceLevel}
          />
          <DetailItem
            label="Wealth"
            value={entity.factionDetails.wealthLevel}
          />
          <DetailItem
            label="Founded"
            value={entity.factionDetails.foundedYear}
          />
        </div>
      </section>
    );
  }

  if (entity.type === "EVENT" && entity.eventDetails) {
    return (
      <section className="panel entity-typed-details">
        <h2>Event Details</h2>
        <div className="detail-grid">
          <DetailItem
            label="Event Type"
            value={entity.eventDetails.eventType}
          />
          <DetailItem label="Date" value={entity.eventDetails.date} />
          <DetailItem label="Outcome" value={entity.eventDetails.outcome} />
          <DetailItem
            label="Significance"
            value={entity.eventDetails.significance}
          />
        </div>
      </section>
    );
  }

  return null;
}

type DetailItemProps = {
  label: string;
  value: string | number | null | undefined;
};

function DetailItem({ label, value }: DetailItemProps) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  return (
    <div className="detail-item">
      <span className="detail-item__label">{label}</span>
      <span className="detail-item__value">{value}</span>
    </div>
  );
}
