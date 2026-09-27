import { useState } from 'react';

const KNOWN = [
  'Instagram', 'TikTok', 'YouTube', 'Google Search', 'Facebook',
  'LinkedIn', 'Pinterest', 'X (Twitter)', 'Podcasts', 'Print/OOH',
];

const INDUSTRIES = [
  'SaaS / Software', 'E-commerce / DTC retail', 'Fashion & apparel', 'Beauty & personal care',
  'Food & beverage', 'Health & fitness', 'Finance / fintech', 'B2B services / consulting',
  'Education / edtech', 'Real estate', 'Travel & hospitality', 'Gaming / entertainment',
  'Local / brick-and-mortar',
];

export default function CompanyForm({ onSubmit, loading }) {
  const [company, setCompany] = useState('');
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  const [buyer, setBuyer] = useState('b2c');
  const [goal, setGoal] = useState('awareness');
  const [budget, setBudget] = useState('5000');
  const [age, setAge] = useState('25-34');
  const [known, setKnown] = useState([]);
  const [notes, setNotes] = useState('');

  function toggleKnown(p) {
    setKnown((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!company.trim() || !budget) return;
    onSubmit({ company, industry, buyer, goal, budget: Number(budget), age, known, notes });
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <h2>Your details</h2>

      <div className="field">
        <label htmlFor="company">Company / product name</label>
        <input
          id="company" type="text" value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="e.g. Loomstack" required
        />
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="industry">Industry</label>
          <select id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            {INDUSTRIES.map((i) => <option key={i}>{i}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="buyer">Sells to</label>
          <select id="buyer" value={buyer} onChange={(e) => setBuyer(e.target.value)}>
            <option value="b2c">Consumers (B2C)</option>
            <option value="b2b">Businesses (B2B)</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="goal">Primary goal this budget</label>
        <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)}>
          <option value="awareness">Brand awareness / reach</option>
          <option value="consideration">Consideration / traffic</option>
          <option value="leads">Lead generation</option>
          <option value="conversion">Direct sales / conversion</option>
        </select>
      </div>

      <div className="row2">
        <div className="field">
          <label htmlFor="budget">Monthly budget (USD)</label>
          <input
            id="budget" type="number" min="100" value={budget}
            onChange={(e) => setBudget(e.target.value)} required
          />
        </div>
        <div className="field">
          <label htmlFor="age">Audience age</label>
          <select id="age" value={age} onChange={(e) => setAge(e.target.value)}>
            <option value="13-17">13–17</option>
            <option value="18-24">18–24</option>
            <option value="25-34">25–34</option>
            <option value="35-44">35–44</option>
            <option value="45-60">45–60</option>
            <option value="60+">60+</option>
          </select>
        </div>
      </div>

      <fieldset>
        <legend>Where does your audience already spend attention? (pick any)</legend>
        <div className="chip-set">
          {KNOWN.map((p) => (
            <label key={p} className={`chip ${known.includes(p) ? 'checked' : ''}`}>
              <input type="checkbox" checked={known.includes(p)} onChange={() => toggleKnown(p)} />
              {p}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="notes">Anything else about your audience</label>
        <textarea
          id="notes" value={notes} onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. visual product, niche hobbyist community, high-consideration purchase..."
        />
      </div>

      <button type="submit" className="submit" disabled={loading}>
        {loading ? 'Tuning…' : 'Tune the dial →'}
      </button>
    </form>
  );
}
