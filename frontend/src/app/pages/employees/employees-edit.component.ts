import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-employees-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="edit-wrapper">
      <div class="edit-card" *ngIf="employee">
        <h2>Editar Empleado</h2>

        <form (ngSubmit)="updateEmployee()" class="form">
          <input
            type="number"
            [(ngModel)]="employee.codigo"
            name="codigo"
            placeholder="Código"
            required
          />

          <input
            [(ngModel)]="employee.nombre"
            name="nombre"
            placeholder="Nombre"
            required
          />

          <input
            [(ngModel)]="employee.apellido1"
            name="apellido1"
            placeholder="Primer Apellido"
            required
          />

          <input
            [(ngModel)]="employee.apellido2"
            name="apellido2"
            placeholder="Segundo Apellido"
            required
          />

          <select [(ngModel)]="employee.codigo_departamento" name="codigo_departamento" required>
            <option value="">Seleccione un departamento</option>
            <option *ngFor="let dept of departments" [value]="dept.codigo">
              {{ dept.nombre }}
            </option>
          </select>

          <button type="submit">Actualizar</button>
          <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .edit-wrapper {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f8fafc;
      padding: 20px;
    }

    .edit-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 40px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #1e293b;
    }

    .form input, .form select {
      width: 100%;
      padding: 10px;
      margin-bottom: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
      font-size: 14px;
    }

    .form button {
      width: 100%;
      background-color: #0ea5e9;
      color: white;
      border: none;
      padding: 10px;
      font-size: 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }

    .form button:hover {
      background-color: #0369a1;
    }

    .error {
      color: #dc2626;
      text-align: center;
      margin-top: 10px;
    }
  `]
})
export class EmployeesEditComponent implements OnInit {
  employee: any = null;
  departments: any[] = [];
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe({
        next: (res) => this.employee = res,
        error: () => this.errorMsg = 'Error al cargar empleado'
      });
    }

    this.departmentService.getDepartments().subscribe({
      next: (res) => this.departments = res,
      error: () => this.departments = []
    });
  }

  updateEmployee() {
    if (
      !this.employee.codigo || !this.employee.nombre || !this.employee.apellido1 ||
      !this.employee.apellido2 || !this.employee.codigo_departamento
    ) {
      this.errorMsg = 'Todos los campos son obligatorios.';
      return;
    }

    this.employeeService.updateEmployee(this.employee._id, this.employee).subscribe({
      next: () => this.router.navigate(['/employees']),
      error: (err) => {
        console.error(err);
        this.errorMsg = err.error?.msg || 'Error al actualizar empleado';
      }
    });
  }
}