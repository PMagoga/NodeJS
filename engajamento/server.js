const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3600;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// importa as rotas
const employeesRoutes = require('./routes/soldadosev');
const cbsdRoutes = require('./routes/cbsdep');

// usa as rotas
app.use('/api/sdev', employeesRoutes);
app.use('/api/cbsd', cbsdRoutes);

// páginas
app.get('/cbsd', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cbsd.html'));
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
