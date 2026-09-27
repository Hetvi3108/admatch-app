import { useState } from 'react';

const GOAL_LABELS = {
  awareness: 'awareness',
  consideration: 'consideration/traffic',
  leads: 'lead generation',
  conversion: 'direct conversion',
};

export default function Results({ inputs, results }) {
  return (
    <>
      <div className="results-head">
        <h2>Best fit for {inputs.company || 'your company'}</h2>
        <span className="meta">
          ${Number(inputs.budget).toLocaleString()}/mo · {GOAL_LABELS[inputs.goal] || inputs.goal} · {inputs.buyer === 'b2b' ? 'B2B' : 'B2C'}
        </span>
      </div>
      {results.map((c, i) => (
        <Channel key={c.id} channel={c} rank={i + 1} top={i === 0} />
      ))}
    </>
  );
}

function Channel({ channel, rank, top }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`channel ${top ? 'top' : ''}`}>
      <div className="c-head">
        <span className="c-rank">{String(rank).padStart(2, '0')}</span>
        <div className="c-name-wrap">
          <div className="c-name">{channel.name}</div>
          <div className="c-type">{channel.type}</div>
        </div>
        <div className="c-score">{channel.score}</div>
      </div>
      <div className="meter"><i style={{ width: `${channel.score}%` }} /></div>
      <p className="c-why">{channel.why}</p>
      <div className="c-stats">
        <div><span>Typical cost</span><b>{channel.cpc}</b></div>
        <div><span>Typical CAC</span><b>{channel.cac}</b></div>
      </div>
      <button className="toggle-detail" onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide detail ↑' : 'Why, and trade-offs ↓'}
      </button>
      {open && (
        <div className="detail open">
          <ul>
            {channel.pros.map((p) => <li key={p}>{p}</li>)}
            {channel.cons.map((p) => <li key={p}>Watch out: {p}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
