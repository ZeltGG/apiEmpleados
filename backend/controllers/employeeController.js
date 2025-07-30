const Employee = require('../models/Employee');

// Crear empleado
const createEmployee = async (req, res) => {
  try {
    const { codigo, nombre, apellido1, apellido2, codigo_departamento } = req.body;
    if (!codigo || !nombre || !apellido1 || !apellido2 || !codigo_departamento) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }
    const newEmployee = new Employee({ codigo, nombre, apellido1, apellido2, codigo_departamento });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('❌ Error al crear empleado:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Obtener todos los empleados
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error('❌ Error al obtener empleados:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Obtener un empleado por ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ msg: 'Empleado no encontrado' });
    }
    res.json(employee);
  } catch (error) {
    console.error('❌ Error al obtener empleado por ID:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Actualizar empleado
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ msg: 'Empleado no encontrado' });
    }
    res.json(updatedEmployee);
  } catch (error) {
    console.error('❌ Error al actualizar empleado:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

// Eliminar empleado
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ msg: 'Empleado no encontrado' });
    }
    res.json({ msg: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar empleado:', error);
    res.status(500).json({ msg: 'Error del servidor' });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee
};