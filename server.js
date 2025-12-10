
const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa banco SQLite
const db = new sqlite3.Database(path.join(__dirname, 'data.db'));
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS respostas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      texto TEXT NOT NULL,
      criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API para receber resposta
app.post('/api/respostas', (req, res) => {
  const texto = (req.body && req.body.texto || '').trim();

  if (!texto) {
    return res.status(400).json({ erro: 'O texto não pode estar vazio.' });
  }

  if (texto.length > 2000) {
    return res.status(400).json({ erro: 'O texto deve ter no máximo 2000 caracteres.' });
  }

  db.run('INSERT INTO respostas (texto) VALUES (?)', [texto], function (err) {
    if (err) {
      console.error('Erro ao salvar resposta:', err);
      return res.status(500).json({ erro: 'Erro ao salvar resposta.' });
    }
    // Não retornamos ID para não ter nada “sequencial” exposto
    res.json({ ok: true });
  });
});

// API para listar respostas (para leitura/admin)
app.get('/api/respostas', (req, res) => {
  db.all('SELECT texto, criado_em FROM respostas ORDER BY criado_em ASC', [], (err, rows) => {
    if (err) {
      console.error('Erro ao listar respostas:', err);
      return res.status(500).json({ erro: 'Erro ao listar respostas.' });
    }
    res.json({ respostas: rows });
  });
});

// Rotas de conveniência para páginas
app.get('/participar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/leitura', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'respostas.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor ouvindo em http://localhost:${PORT}`);
});
