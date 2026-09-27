import { useState, useEffect, useCallback } from 'react';
import CompanyForm from './components/CompanyForm.jsx';
import Results from './components/Results.jsx';
import History from './components/History.jsx';
import { analyze, getHistory, getAnalysis } from './api.js';

export default function App() {
  const [current, setCurrent] = useState(null); // { inputs, results }
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadHistory = useCallback(async () => {
    try {
      const rows = await getHistory();
      setHistory(rows);
    } catch (e) {
      console.error('Could not load history:', e);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  async function handleSubmit(inputs) {
    setLoading(true);
    setError('');
    try {
      const data = await analyze(inputs);
      setCurrent(data);
      loadHistory();
    } catch (e) {
      setError(e.message || 'Could not reach the Signal API. Is the backend running on port 5000?');
    } finally {
      setLoading(false);
    }
  }

  async function handleHistorySelect(id) {
    try {
      const data = await getAnalysis(id);
      setCurrent(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="wrap">
      <header className="top">
        <div className="brand">
          <span className="dial" aria-hidden="true"></span>
          <span>Signal</span>
        </div>
        <p className="tagline">
          A tuning dial for ad spend — enter what you're selling, get a ranked read on where it'll actually land.
        </p>
      </header>

      <h1>Find the channel your audience is actually on.</h1>
      <p className="lede">
        Reach isn't the same as fit. Tell Signal about your company, product, budget and audience —
        it scores nine ad channels and influencer tiers against your specifics, not their marketing decks.
      </p>

      <div className="grid">
        <CompanyForm onSubmit={handleSubmit} loading={loading} />

        <section className="results">
          {error && <p className="error-msg">{error}</p>}
          {!current && !error && (
            <div className="empty">Your ranked channels will appear here — fill in the form and tune the dial.</div>
          )}
          {current && <Results inputs={current.inputs} results={current.results} />}
        </section>
      </div>

      <History items={history} onSelect={handleHistorySelect} />

      <footer>
        Estimates are directional industry benchmarks, not quotes — actual CPC/CAC vary by creative quality,
        competition and seasonality. Use this to shortlist 2–3 channels, then run a small real test before
        committing full budget. Every analysis here is saved to a local SQLite database through the Signal API.
      </footer>
    </div>
  );
}
