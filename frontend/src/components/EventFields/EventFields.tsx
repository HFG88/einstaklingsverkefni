type Props = {
  eventType: string;
  setEventType: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  outcome: string;
  setOutcome: (value: string) => void;
  significance: string;
  setSignificance: (value: string) => void;
};

export function EventFields({
  eventType,
  setEventType,
  date,
  setDate,
  outcome,
  setOutcome,
  significance,
  setSignificance,
}: Props) {
  return (
    <div className="form-stack">
      <label className="form-field">
        <span>Event Type</span>
        <input
          type="text"
          value={eventType}
          onChange={(e) => setEventType(e.target.value)}
          placeholder="e.g. Battle, Festival, Council, Disaster"
        />
      </label>

      <label className="form-field">
        <span>Date</span>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="e.g. TA 3018, Midwinter, 3rd Age"
        />
      </label>

      <label className="form-field">
        <span>Outcome</span>
        <input
          type="text"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          placeholder="e.g. Victory, Defeat, Fellowship formed"
        />
      </label>

      <label className="form-field">
        <span>Significance</span>
        <input
          type="text"
          value={significance}
          onChange={(e) => setSignificance(e.target.value)}
          placeholder="e.g. Minor, Major, World-changing"
        />
      </label>
    </div>
  );
}
