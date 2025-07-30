const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Ruta de prueba
router.get('/test', (req, res) => {
  res.json({ msg: 'Auth route funcionando!' });
});

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

module.exports = router;