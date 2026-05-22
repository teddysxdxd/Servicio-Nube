const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Base de datos en memoria
let members = [
  { id: 1, name: 'Juan Pérez', membership: 'Premium', status: 'active' },
  { id: 2, name: 'María García', membership: 'Basic', status: 'active' }
];

let attendance = [];

// Obtener todos los miembros
app.get('/api/members', (req, res) => {
  res.json(members);
});

// Agregar nuevo miembro
app.post('/api/members', (req, res) => {
  const newMember = {
    id: members.length + 1,
    name: req.body.name,
    membership: req.body.membership,
    status: 'active'
  };
  members.push(newMember);
  res.json(newMember);
});

// Registrar asistencia
app.post('/api/attendance', (req, res) => {
  const { memberId, date } = req.body;
  attendance.push({
    memberId,
    date: date || new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString()
  });
  res.json({ success: true, message: 'Asistencia registrada' });
});

// Obtener asistencias del día
app.get('/api/attendance/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => a.date === today);
  res.json(todayAttendance);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});