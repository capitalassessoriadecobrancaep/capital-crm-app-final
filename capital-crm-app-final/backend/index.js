const express = require('express');
const app = express();
app.use(express.json());

// Simple in-memory "database" for demo/testing
let users = [
  { id: 1, email: 'admin@capital.com.br', password: '123456', name: 'Administrador' }
];
let sessions = {};

// Auth route (login)
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if(!user) return res.status(401).json({ error: 'Credenciais inválidas' });
  // Simple token (DO NOT use in production)
  const token = 'token-' + Date.now() + '-' + user.id;
  sessions[token] = user;
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

// Protected route example
app.get('/api/dashboard', (req, res) => {
  const auth = req.headers['authorization'] || '';
  const token = auth.replace('Bearer ', '');
  if(!sessions[token]) return res.status(401).json({ error: 'Não autorizado' });
  // Return demo dashboard data
  res.json({
    totalClients: 42,
    totalOpenInvoices: 17,
    overdueAmountBRL: 12345.67,
    recent: [
      { id: 1, name: 'Empresa ABC', value: 'R$ 1.234,56', due: '2025-07-25' },
      { id: 2, name: 'Clínica Sorriso', value: 'R$ 2.000,00', due: '2025-08-03' }
    ]
  });
});

// Simple route to create a test user (for initial testing)
app.post('/api/users', (req, res) => {
  const { email, password, name } = req.body;
  const id = users.length + 1;
  users.push({ id, email, password, name });
  res.json({ id, email, name });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Backend running on port', port));