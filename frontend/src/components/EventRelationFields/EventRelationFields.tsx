import type { EntityOption } from "../../types/entity";

type Props = {
  locations: EntityOption[];
  occursInSlug: string;
  setOccursInSlug: (value: string) => void;
};

export function EventRelationFields({
  locations,
  occursInSlug,
  setOccursInSlug,
}: Props) {
  return (
    <div className="form-stack">
      <label className="form-field">
        <span>Occurs In</span>
        <select
          value={occursInSlug}
          onChange={(e) => setOccursInSlug(e.target.value)}
        >
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.slug} value={location.slug}>
              {location.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
