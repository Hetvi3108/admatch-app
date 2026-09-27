import express from 'express';
import cors from 'cors';
import analysesRouter from './routes/analyses.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', analysesRouter);

app.get('/', (req, res) => {
  res.json({ status: 'Signal API running', endpoints: ['/api/analyze', '/api/analyses', '/api/channels'] });
});

app.listen(PORT, () => {
  console.log(`Signal API listening on http://localhost:${PORT}`);
});
