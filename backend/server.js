const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Read functions
const getHodList = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'hod-list.json'), 'utf8'));
const getSpcrTeam = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'spcr-team.json'), 'utf8'));
const getHashtags = () => JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'hashtags.json'), 'utf8'));

// Write functions
const saveHodList = (data) => fs.writeFileSync(path.join(__dirname, 'data', 'hod-list.json'), JSON.stringify(data, null, 2));
const saveSpcrTeam = (data) => fs.writeFileSync(path.join(__dirname, 'data', 'spcr-team.json'), JSON.stringify(data, null, 2));

// Settings Routes
app.get('/settings/hod', (req, res) => res.json(getHodList()));
app.post('/settings/hod', (req, res) => {
  saveHodList(req.body);
  res.json({ success: true });
});

app.get('/settings/spcr', (req, res) => res.json(getSpcrTeam()));
app.post('/settings/spcr', (req, res) => {
  saveSpcrTeam(req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
