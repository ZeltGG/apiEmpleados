import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="title">Empleados</h2>

      <div class="card" *ngFor="let emp of employees">
        <div class="card-header">
          <h3>{{ emp.nombre }} {{ emp.apellido1 }} {{ emp.apellido2 }}</h3>
        </div>
        <div class="card-body">
          <p><strong>Código:</strong> {{ emp.codigo }}</p>
          <p><strong>Departamento:</strong> {{ emp.codigo_departamento }}</p>
          <div class="actions">
            <button (click)="editEmployee(emp._id)">Editar</button>
            <button class="delete" (click)="deleteEmployee(emp._id)">Eliminar</button>
          </div>
        </div>
      </div>

      <p *ngIf="employees.length === 0">No hay empleados registrados.</p>

      <hr />

      <h3 class="subtitle">Agregar nuevo empleado</h3>
      <form (ngSubmit)="createEmployee()" class="form">
        <input type="number" [(ngModel)]="newEmployee.codigo" name="codigo" placeholder="Código" required />
        <input [(ngModel)]="newEmployee.nombre" name="nombre" placeholder="Nombre" required />
        <input [(ngModel)]="newEmployee.apellido1" name="apellido1" placeholder="Primer Apellido" required />
        <input [(ngModel)]="newEmployee.apellido2" name="apellido2" placeholder="Segundo Apellido" required />
        <select [(ngModel)]="newEmployee.codigo_departamento" name="codigo_departamento" required>
          <option value="">Seleccione un departamento</option>
          <option *ngFor="let dept of departments" [value]="dept.codigo">{{ dept.nombre }}</option>
        </select>
        <button type="submit" class="create-btn">Crear</button>
        <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: auto;
      padding: 20px;
    }

    .title, .subtitle {
      text-align: center;
      color: #1e293b;
    }

    .card {
      background: #f9fafb;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }

    .card-header h3 {
      margin: 0;
      font-size: 18px;
    }

    .card-body p {
      margin: 4px 0;
    }

    .actions {
      margin-top: 10px;
    }

    .actions button {
      margin-right: 10px;
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #3b82f6;
      color: white;
    }

    .actions button.delete {
      background-color: #ef4444;
    }

    .form input, .form select {
      display: block;
      width: 100%;
      padding: 8px;
      margin-bottom: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
    }

    .create-btn {
      width: 100%;
      background-color: #10b981;
      color: white;
      padding: 10px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .error {
      color: #dc2626;
      text-align: center;
      margin-top: 10px;
    }
  `]
})
export class EmployeesListComponent implements OnInit {
  employees: any[] = [];
  departments: any[] = [];
  errorMsg = '';

  newEmployee = {
    codigo: null,
    nombre: '',
    apellido1: '',
    apellido2: '',
    codigo_departamento: null
  };

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
    this.loadDepartments();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => this.employees = res,
      error: (err) => console.error('Error al cargar empleados', err)
    });
  }

  loadDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res) => this.departments = res,
      error: (err) => console.error('Error al cargar departamentos', err)
    });
  }

  createEmployee() {
    if (
      !this.newEmployee.codigo || !this.newEmployee.nombre || !this.newEmployee.apellido1 ||
      !this.newEmployee.apellido2 || !this.newEmployee.codigo_departamento
    ) {
      this.errorMsg = 'Todos los campos son obligatorios.';
      return;
    }

    this.employeeService.createEmployee(this.newEmployee).subscribe({
      next: () => {
        this.newEmployee = {
          codigo: null,
          nombre: '',
          apellido1: '',
          apellido2: '',
          codigo_departamento: null
        };
        this.errorMsg = '';
        this.loadEmployees();
      },
      error: (err) => {
        console.error('Error al crear empleado', err);
        this.errorMsg = err.error?.msg || 'Error al crear empleado';
      }
    });
  }

  deleteEmployee(id: string) {
    if (confirm('¿Seguro de eliminar este empleado?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

  editEmployee(id: string) {
    this.router.navigate(['/employees/edit', id]);
  }
}