import { Router } from 'express';
import db from '../db.js';
import { CHANNELS, scoreChannels, reasonFor } from '../scoring.js';

const router = Router();

// POST /api/analyze — score channels for a company and persist the result
router.post('/analyze', (req, res) => {
  const { company, industry, buyer, goal, budget, age, known, notes } = req.body;

  if (!company || !budget || !goal || !buyer || !age) {
    return res.status(400).json({
      error: 'Missing required fields: company, budget, goal, buyer, age',
    });
  }

  const inputs = {
    company: String(company).trim(),
    industry: industry || 'General',
    buyer,
    goal,
    budget: Number(budget),
    age,
    known: Array.isArray(known) ? known : [],
    notes: notes || '',
  };

  const results = scoreChannels(inputs).map((c) => ({
    ...c,
    why: reasonFor(c, inputs),
  }));

  const stmt = db.prepare(`
    INSERT INTO analyses
      (company, industry, buyer_type, goal, budget, age_range, known_platforms, notes, results, top_channel)
    VALUES
      (@company, @industry, @buyer, @goal, @budget, @age, @known, @notes, @results, @top)
  `);

  const info = stmt.run({
    company: inputs.company,
    industry: inputs.industry,
    buyer: inputs.buyer,
    goal: inputs.goal,
    budget: inputs.budget,
    age: inputs.age,
    known: JSON.stringify(inputs.known),
    notes: inputs.notes,
    results: JSON.stringify(results),
    top: results[0]?.name || '',
  });

  res.status(201).json({ id: info.lastInsertRowid, inputs, results });
});

// GET /api/analyses — recent history, lightweight rows for the sidebar
router.get('/analyses', (req, res) => {
  const rows = db
    .prepare(
      `SELECT id, company, goal, budget, top_channel, created_at
       FROM analyses ORDER BY id DESC LIMIT 50`
    )
    .all();
  res.json(rows);
});

// GET /api/analyses/:id — full saved record
router.get('/analyses/:id', (req, res) => {
  const row = db.prepare(`SELECT * FROM analyses WHERE id = ?`).get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });

  res.json({
    id: row.id,
    inputs: {
      company: row.company,
      industry: row.industry,
      buyer: row.buyer_type,
      goal: row.goal,
      budget: row.budget,
      age: row.age_range,
      known: JSON.parse(row.known_platforms || '[]'),
      notes: row.notes,
    },
    results: JSON.parse(row.results),
    created_at: row.created_at,
  });
});

// DELETE /api/analyses/:id
router.delete('/analyses/:id', (req, res) => {
  const info = db.prepare(`DELETE FROM analyses WHERE id = ?`).run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Not found' });
  res.status(204).end();
});

// GET /api/channels — reference list of channels Signal knows about
router.get('/channels', (req, res) => {
  res.json(CHANNELS.map(({ id, name, type }) => ({ id, name, type })));
});

export default router;
