const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
const SCORES_FILE = path.join(__dirname, 'scores.json');
function readScores() {
  if (!fs.existsSync(SCORES_FILE)) return [];
  return JSON.parse(fs.readFileSync(SCORES_FILE, 'utf-8'));
}

function writeScores(scores) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
}

app.get('/scores', (req, res) => {
  const scores = readScores();
  const top10 = scores.sort((a, b) => b.score - a.score).slice(0, 10);
  res.json(top10);
});

app.post('/scores', (req, res) => {
  const { name, score } = req.body;

  if (!name || typeof score !== 'number') {
    return res.status(400).json({ error: 'name and score are required' });
  }

  const scores = readScores();
  scores.push({ name, score, date: new Date().toISOString() });
  writeScores(scores);

  res.status(201).json({ message: 'Score saved!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});