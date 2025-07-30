const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido1: {
    type: String,
    required: true
  },
  apellido2: {
    type: String,
    required: true
  },
  codigo_departamento: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);