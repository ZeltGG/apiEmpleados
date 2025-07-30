const Department = require('../models/Department');

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.json(departments);
  } catch (error) {
    console.error('❌ Error al obtener departamentos:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { codigo, nombre } = req.body;
    if (!codigo || !nombre) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    const newDepartment = new Department({ codigo, nombre });
    await newDepartment.save();
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error('❌ Error al crear departamento:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ msg: 'Departamento no encontrado' });
    }
    res.json(department);
  } catch (error) {
    console.error('❌ Error al obtener departamento por ID:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ msg: 'Departamento no encontrado' });
    }
    res.json(updated);
  } catch (error) {
    console.error('❌ Error al actualizar departamento:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const deleted = await Department.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: 'Departamento no encontrado' });
    }
    res.json({ msg: 'Departamento eliminado' });
  } catch (error) {
    console.error('❌ Error al eliminar departamento:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

module.exports = {
  getDepartments,
  createDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
};