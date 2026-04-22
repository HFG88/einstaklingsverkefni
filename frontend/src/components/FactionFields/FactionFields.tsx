type Props = {
  factionType: string;
  setFactionType: (value: string) => void;
  ideology: string;
  setIdeology: (value: string) => void;
  goal: string;
  setGoal: (value: string) => void;
  reputation: string;
  setReputation: (value: string) => void;
  influenceLevel: string;
  setInfluenceLevel: (value: string) => void;
  wealthLevel: string;
  setWealthLevel: (value: string) => void;
  foundedYear: string;
  setFoundedYear: (value: string) => void;
};

export function FactionFields({
  factionType,
  setFactionType,
  ideology,
  setIdeology,
  goal,
  setGoal,
  reputation,
  setReputation,
  influenceLevel,
  setInfluenceLevel,
  wealthLevel,
  setWealthLevel,
  foundedYear,
  setFoundedYear,
}: Props) {
  return (
    <div className="form-stack">
      <label className="form-field">
        <span>Faction Type</span>
        <input
          type="text"
          value={factionType}
          onChange={(e) => setFactionType(e.target.value)}
          placeholder="e.g. Guild, Kingdom, Cult, Order"
        />
      </label>

      <label className="form-field">
        <span>Ideology</span>
        <input
          type="text"
          value={ideology}
          onChange={(e) => setIdeology(e.target.value)}
          placeholder="What do they believe in?"
        />
      </label>

      <label className="form-field">
        <span>Goal</span>
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What is their main objective?"
        />
      </label>

      <label className="form-field">
        <span>Reputation</span>
        <input
          type="text"
          value={reputation}
          onChange={(e) => setReputation(e.target.value)}
          placeholder="e.g. Heroic, Feared, Secretive"
        />
      </label>

      <label className="form-field">
        <span>Influence Level</span>
        <input
          type="text"
          value={influenceLevel}
          onChange={(e) => setInfluenceLevel(e.target.value)}
          placeholder="e.g. Local, Regional, Global"
        />
      </label>

      <label className="form-field">
        <span>Wealth Level</span>
        <input
          type="text"
          value={wealthLevel}
          onChange={(e) => setWealthLevel(e.target.value)}
          placeholder="e.g. Poor, Moderate, Wealthy"
        />
      </label>

      <label className="form-field">
        <span>Founded Year</span>
        <input
          type="number"
          value={foundedYear}
          onChange={(e) => setFoundedYear(e.target.value)}
          placeholder="e.g. 3018"
        />
      </label>
    </div>
  );
}
