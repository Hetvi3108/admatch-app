const GOAL_LABELS = {
  awareness: 'awareness',
  consideration: 'consideration/traffic',
  leads: 'lead generation',
  conversion: 'direct conversion',
};

export default function History({ items, onSelect }) {
  if (!items.length) return null;
  return (
    <div className="history">
      <h3>Recent analyses (from the database)</h3>
      {items.map((h) => (
        <div key={h.id} className="hist-item" onClick={() => onSelect(h.id)}>
          <span><b>{h.company || 'Untitled'}</b> — {GOAL_LABELS[h.goal] || h.goal}</span>
          <span>{h.top_channel}</span>
        </div>
      ))}
    </div>
  );
}
