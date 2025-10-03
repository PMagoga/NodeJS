const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'sdev.json');
const upload = multer({ dest: path.join(__dirname, '..', 'public', 'uploads') });

// GET
router.get('/', async (req, res) => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]');
    res.json(JSON.parse(raw || '[]'));
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
});

// POST
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const body = req.body || {};
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]');
    const data = JSON.parse(raw || '[]');

    const newItem = {
      id: Date.now(),
      number: body.number || '',
      name: body.name || '',
      qualification: body.qualification || '',
      section: body.section || '',
      engage: body.engage || '',
      dependent: body.dependent || '',
      meetingOpinion: body.meetingOpinion || '',
      notes: body.notes || '',
      punishments: body.punishments || '',
      photo: req.file ? `/uploads/${req.file.filename}` : (body.photo || ''),
      statusColor: body.statusColor || 'default'
    };

    data.push(newItem);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar' });
  }
});

// Atualizar existente (simples)
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body || {};
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]');
    const data = JSON.parse(raw || '[]');

    const idx = data.findIndex(d => d.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });

    const updated = Object.assign({}, data[idx], {
      number: body.number || data[idx].number,
      name: body.name || data[idx].name,
      qualification: body.qualification || data[idx].qualification,
      section: body.section || data[idx].section,
      engage: body.engage || data[idx].engage,
      dependent: body.dependent || data[idx].dependent,
      meetingOpinion: body.meetingOpinion || data[idx].meetingOpinion,
      notes: body.notes || data[idx].notes,
      punishments: body.punishments || data[idx].punishments,
      photo: req.file ? `/uploads/${req.file.filename}` : (body.photo || data[idx].photo),
      statusColor: body.statusColor || data[idx].statusColor || 'default'
    });

    data[idx] = updated;
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
});

// PUT para atualizar a cor do status
router.put('/status/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { statusColor } = req.body; // Pega apenas o statusColor
    
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]');
    const data = JSON.parse(raw || '[]');

    const idx = data.findIndex(d => d.id === id);
    
    if (idx === -1) return res.status(404).json({ error: 'Não encontrado' });

    // Atualiza apenas a cor
    const updated = Object.assign({}, data[idx], {
      statusColor: statusColor || data[idx].statusColor || 'default'
    });

    data[idx] = updated;
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

// Deletar
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const raw = await fs.readFile(DATA_FILE, 'utf8').catch(() => '[]');
    let data = JSON.parse(raw || '[]');
    data = data.filter(d => d.id !== id);
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar' });
  }
});


module.exports = router;
