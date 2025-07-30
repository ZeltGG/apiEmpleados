const express = require('express');
const router = express.Router();
const { createDepartment, getDepartmentById, getDepartments, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Ruta de prueba
router.get('/test', (req, res) => {
    res.json({ msg: 'Auth route funcionando!' });
  });

// CRUD departamentos (todas protegidas)
router.post('/', authMiddleware, createDepartment);
router.get('/', authMiddleware, getDepartments);
router.put('/:id', authMiddleware, updateDepartment);
router.delete('/:id', authMiddleware, deleteDepartment);
router.get('/:id', authMiddleware, getDepartmentById);

module.exports = router;