import type { EntityOption } from "../../types/entity";

type Props = {
  locations: EntityOption[];
  homeSlug: string;
  setHomeSlug: (value: string) => void;
};

export function CharacterRelationFields({
  locations,
  homeSlug,
  setHomeSlug,
}: Props) {
  return (
    <div className="form-stack">
      <label className="form-field">
        <span>Home</span>
        <select value={homeSlug} onChange={(e) => setHomeSlug(e.target.value)}>
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
