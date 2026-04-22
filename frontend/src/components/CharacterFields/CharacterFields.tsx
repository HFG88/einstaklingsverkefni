type Props = {
  race: string;
  setRace: (value: string) => void;
  role: string;
  setRole: (value: string) => void;
  profession: string;
  setProfession: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  age: string;
  setAge: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  alignment: string;
  setAlignment: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
};

export function CharacterFields({
  race,
  setRace,
  role,
  setRole,
  profession,
  setProfession,
  status,
  setStatus,
  age,
  setAge,
  gender,
  setGender,
  alignment,
  setAlignment,
  title,
  setTitle,
}: Props) {
  return (
    <div className="form-stack">
      <label className="form-field">
        <span>Race</span>
        <input
          type="text"
          value={race}
          onChange={(e) => setRace(e.target.value)}
          placeholder="e.g. Human, Elf, Hobbit"
        />
      </label>

      <label className="form-field">
        <span>Role</span>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g. Ranger, Mage, Noble"
        />
      </label>

      <label className="form-field">
        <span>Profession</span>
        <input
          type="text"
          value={profession}
          onChange={(e) => setProfession(e.target.value)}
          placeholder="e.g. Warrior, Blacksmith"
        />
      </label>

      <label className="form-field">
        <span>Status</span>
        <input
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="e.g. Alive, Missing, Dead"
        />
      </label>

      <label className="form-field">
        <span>Age</span>
        <input
          type="number"
          min="0"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="e.g. 87"
        />
      </label>

      <label className="form-field">
        <span>Gender</span>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          placeholder="Optional"
        />
      </label>

      <label className="form-field">
        <span>Alignment</span>
        <input
          type="text"
          value={alignment}
          onChange={(e) => setAlignment(e.target.value)}
          placeholder="e.g. Good, Neutral"
        />
      </label>

      <label className="form-field">
        <span>Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Strider, Captain"
        />
      </label>
    </div>
  );
}
