import type { EntityOption } from "../../types/entity";

type Props = {
  characters: EntityOption[];
  inhabitantSlugs: string[];
  setInhabitantSlugs: (value: string[]) => void;
};

export function LocationRelationFields({
  characters,
  inhabitantSlugs,
  setInhabitantSlugs,
}: Props) {
  function toggleInhabitant(slug: string) {
    if (inhabitantSlugs.includes(slug)) {
      setInhabitantSlugs(inhabitantSlugs.filter((s) => s !== slug));
    } else {
      setInhabitantSlugs([...inhabitantSlugs, slug]);
    }
  }

  return (
    <div className="form-stack">
      <div className="form-field">
        <span>Inhabitants</span>

        <div className="checkbox-list">
          {characters.length === 0 ? (
            <p>No characters available.</p>
          ) : (
            characters.map((character) => (
              <label key={character.slug} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={inhabitantSlugs.includes(character.slug)}
                  onChange={() => toggleInhabitant(character.slug)}
                />
                <span>{character.name}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
