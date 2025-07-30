const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');

// Verificación de controladores cargados (opcional, solo para debug)
console.log('📦 Empleados controller importado correctamente:', {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
});

// Ruta de prueba
router.get('/test', (req, res) => {
  res.json({ msg: 'Auth route funcionando!' });
});

// CRUD empleados (todas protegidas)
router.post('/', authMiddleware, createEmployee);
router.get('/', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, getEmployeeById); // 👈 Esta es la línea que antes fallaba
router.put('/:id', authMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;