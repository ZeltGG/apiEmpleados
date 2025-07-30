import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Agregar Empleado</h2>
      <form (ngSubmit)="createEmployee()">
        <input [(ngModel)]="employee.nombre" name="nombre" placeholder="Nombre" required>
        <input [(ngModel)]="employee.apellido1" name="apellido1" placeholder="Primer Apellido" required>
        <input [(ngModel)]="employee.apellido2" name="apellido2" placeholder="Segundo Apellido" required>
        <input [(ngModel)]="employee.codigo" name="codigo" placeholder="Código" required>
        <button type="submit">Guardar</button>
      </form>
      <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: auto; }
    input { display: block; margin: 10px 0; padding: 5px; width: 100%; }
    button { padding: 8px 15px; }
    .error { color: red; }
  `]
})
export class EmployeeCreateComponent {
  employee = {
    nombre: '',
    apellido1: '',
    apellido2: '',
    codigo: ''
  };
  errorMsg = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  createEmployee() {
    this.employeeService.createEmployee(this.employee).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: err => this.errorMsg = err.error?.msg || 'Error al crear empleado'
    });
  }
}