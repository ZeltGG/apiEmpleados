const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: true,
    unique: true
  },
  nombre: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Department', DepartmentSchema);
