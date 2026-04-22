type Props = {
  locationType: string;
  setLocationType: (value: string) => void;
  size: string;
  setSize: (value: string) => void;
  climate: string;
  setClimate: (value: string) => void;
  terrain: string;
  setTerrain: (value: string) => void;
  population: string;
  setPopulation: (value: string) => void;
  wealthLevel: string;
  setWealthLevel: (value: string) => void;
  dangerLevel: string;
  setDangerLevel: (value: string) => void;
};

export function LocationFields({
  locationType,
  setLocationType,
  size,
  setSize,
  climate,
  setClimate,
  terrain,
  setTerrain,
  population,
  setPopulation,
  wealthLevel,
  setWealthLevel,
  dangerLevel,
  setDangerLevel,
}: Props) {
  return (
    <div className="form-stack">
      <label className="form-field">
        <span>Location Type</span>
        <input
          type="text"
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
          placeholder="e.g. City, Village, Ruin, Cave"
        />
      </label>

      <label className="form-field">
        <span>Size</span>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="e.g. Small, Medium, Large"
        />
      </label>

      <label className="form-field">
        <span>Climate</span>
        <input
          type="text"
          value={climate}
          onChange={(e) => setClimate(e.target.value)}
          placeholder="e.g. Temperate, Cold, Tropical"
        />
      </label>

      <label className="form-field">
        <span>Terrain</span>
        <input
          type="text"
          value={terrain}
          onChange={(e) => setTerrain(e.target.value)}
          placeholder="e.g. Valley, Mountain, Forest"
        />
      </label>

      <label className="form-field">
        <span>Population</span>
        <input
          type="number"
          min="0"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
          placeholder="e.g. 5000"
        />
      </label>

      <label className="form-field">
        <span>Wealth Level</span>
        <input
          type="text"
          value={wealthLevel}
          onChange={(e) => setWealthLevel(e.target.value)}
          placeholder="e.g. Poor, Average, Wealthy"
        />
      </label>

      <label className="form-field">
        <span>Danger Level</span>
        <input
          type="text"
          value={dangerLevel}
          onChange={(e) => setDangerLevel(e.target.value)}
          placeholder="e.g. Safe, Moderate, Dangerous"
        />
      </label>
    </div>
  );
}
