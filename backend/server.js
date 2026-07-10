const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

app.post('/caption', async (req, res) => {
  try {
    const { students, companyName, stipend } = req.body;
    
    // Construct prompt
    let prompt = `You are an AI assistant helping a placement cell write a professional LinkedIn announcement for student placements.\n\n`;
    prompt += `Details:\n`;
    prompt += `Company: ${companyName}\n`;
    if (stipend) prompt += `Stipend/Package: ${stipend}\n`;
    
    prompt += `Students:\n`;
    students.forEach((student, i) => {
      prompt += `${i+1}. Name: ${student.name}, Role: ${student.role}, Dept: ${student.department}, Batch: ${student.batch}, LinkedIn: ${student.linkedinProfileUrl || 'N/A'}\n`;
    });
    
    const hodList = getHodList();
    const spcrTeam = getSpcrTeam();
    const hashtags = getHashtags();
    
    // Get HOD tags based on departments
    const depts = [...new Set(students.map(s => s.department))];
    let hodTags = depts.map(dept => {
      const hod = hodList[dept];
      return hod ? `${hod.name} (${hod.linkedinUrl})` : `HOD of ${dept}`;
    }).join(', ');
    
    // SPCR Team tags
    let spcrTags = spcrTeam.map(t => `${t.name} (${t.linkedinUrl})`).join(', ');
    
    prompt += `\nInclude acknowledgments for the Head of Departments: ${hodTags}\n`;
    prompt += `Include acknowledgments for the SPCR Core Team: ${spcrTags}\n`;
    prompt += `Include these hashtags: ${hashtags.fixed.join(' ')}\n\n`;
    
    prompt += `Draft a highly engaging LinkedIn post. It must have: 
1. A hook line.
2. A core congratulations line linking the students' profiles.
3. Personal achievement notes (if any).
4. An acknowledgment block tagging HODs and SPCR Team.
5. A hashtag block at the bottom.
Make it professional and enthusiastic. Keep the output clean (no markdown formatting if it's meant to be copy-pasted raw, or keep markdown to a minimum).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    res.json({ caption: response.text });
  } catch (error) {
    console.error('Error generating caption:', error);
    res.status(500).json({ error: 'Failed to generate caption' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
