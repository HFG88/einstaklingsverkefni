import type { EntityOption } from "../../types/entity";

type Props = {
  characters: EntityOption[];
  memberSlugs: string[];
  setMemberSlugs: (value: string[]) => void;
};

export function FactionRelationFields({
  characters,
  memberSlugs,
  setMemberSlugs,
}: Props) {
  function toggleMember(slug: string) {
    if (memberSlugs.includes(slug)) {
      setMemberSlugs(memberSlugs.filter((s) => s !== slug));
    } else {
      setMemberSlugs([...memberSlugs, slug]);
    }
  }

  return (
    <div className="form-stack">
      <div className="form-field">
        <span>Members</span>

        <div className="checkbox-list">
          {characters.length === 0 ? (
            <p>No characters available.</p>
          ) : (
            characters.map((character) => (
              <label key={character.slug} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={memberSlugs.includes(character.slug)}
                  onChange={() => toggleMember(character.slug)}
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
