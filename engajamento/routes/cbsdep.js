const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');

const app = express.Router();

const upload = multer({ dest: path.join(__dirname, '..', 'public', 'uploads') });


// ====== ROTAS PARA CB/SD ======
const DATA_FILE_CBSD = path.join(__dirname, '..', 'cbsd.json');

// GET - listar todos
app.get('/', async (req, res) => {
  try {
    const raw = await fs.readFile(DATA_FILE_CBSD, 'utf8').catch(() => '[]');
    const data = JSON.parse(raw || '[]');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao ler dados' });
  }
});

// POST - criar novo
app.post('/', upload.single('photo'), async (req, res) => {
  try {
    const body = req.body || {};
    const raw = await fs.readFile(DATA_FILE_CBSD, 'utf8').catch(() => '[]');
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
      photo: req.file ? `/uploads/${req.file.filename}` : (body.photo || '')
    };

    data.push(newItem);
    await fs.writeFile(DATA_FILE_CBSD, JSON.stringify(data, null, 2), 'utf8');
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar' });
  }
});

// PUT - atualizar existente
app.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = req.body || {};
    const raw = await fs.readFile(DATA_FILE_CBSD, 'utf8').catch(() => '[]');
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
      photo: req.file ? `/uploads/${req.file.filename}` : (body.photo || data[idx].photo)
    });

    data[idx] = updated;
    await fs.writeFile(DATA_FILE_CBSD, JSON.stringify(data, null, 2), 'utf8');
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
});

// DELETE - remover
app.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const raw = await fs.readFile(DATA_FILE_CBSD, 'utf8').catch(() => '[]');
    let data = JSON.parse(raw || '[]');

    data = data.filter(d => d.id !== id);
    await fs.writeFile(DATA_FILE_CBSD, JSON.stringify(data, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar' });
  }
});


module.exports = app;