import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="departments-wrapper">
      <div class="departments-card">
        <h2>Departamentos</h2>

        <form (ngSubmit)="createDepartment()" class="form">
          <input
            type="number"
            [(ngModel)]="newDepartment.codigo"
            name="codigo"
            placeholder="Código del Departamento"
            required
          />
          <input
            [(ngModel)]="newDepartment.nombre"
            name="nombre"
            placeholder="Nombre del Departamento"
            required
          />
          <button type="submit">Agregar</button>
        </form>

        <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>

        <div *ngIf="departments.length === 0" class="empty">No hay departamentos registrados.</div>

        <ul class="department-list">
          <li *ngFor="let dept of departments">
            <span>{{ dept.codigo }} - {{ dept.nombre }}</span>
            <div class="actions">
              <button (click)="editDepartment(dept._id)">Editar</button>
              <button class="delete" (click)="deleteDepartment(dept._id)">Eliminar</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .departments-wrapper {
      min-height: 100vh;
      background: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .departments-card {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      max-width: 600px;
      width: 100%;
      border: 1px solid #e2e8f0;
    }

    h2 {
      text-align: center;
      margin-bottom: 24px;
      color: #1e293b;
    }

    .form input {
      width: 100%;
      padding: 10px;
      margin-bottom: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 4px;
    }

    .form button {
      width: 100%;
      background-color: #0ea5e9;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .form button:hover {
      background-color: #0369a1;
    }

    .error {
      color: #dc2626;
      text-align: center;
      margin-bottom: 10px;
    }

    .empty {
      text-align: center;
      color: #64748b;
      margin-top: 20px;
    }

    .department-list {
      list-style: none;
      padding: 0;
      margin-top: 24px;
    }

    .department-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 10px;
      background: #f9fafb;
    }

    .actions button {
      margin-left: 10px;
      padding: 6px 10px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .actions button:hover {
      opacity: 0.9;
    }

    .actions .delete {
      background-color: #dc2626;
      color: white;
    }

    .actions button:not(.delete) {
      background-color: #3b82f6;
      color: white;
    }
  `]
})
export class DepartmentsListComponent implements OnInit {
  departments: any[] = [];
  newDepartment = { codigo: '', nombre: '' };
  errorMsg = '';

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments() {
    this.departmentService.getDepartments().subscribe({
      next: (res) => this.departments = res,
      error: () => this.errorMsg = 'Error al cargar departamentos'
    });
  }

  createDepartment() {
    if (!this.newDepartment.codigo || !this.newDepartment.nombre) {
      this.errorMsg = 'Todos los campos son obligatorios.';
      return;
    }

    this.departmentService.createDepartment(this.newDepartment).subscribe({
      next: () => {
        this.newDepartment = { codigo: '', nombre: '' };
        this.errorMsg = '';
        this.fetchDepartments();
      },
      error: () => this.errorMsg = 'Error al crear departamento'
    });
  }

  editDepartment(id: string) {
    this.router.navigate(['/departments/edit', id]);
  }

  deleteDepartment(id: string) {
    if (confirm('¿Estás seguro de eliminar este departamento?')) {
      this.departmentService.deleteDepartment(id).subscribe(() => this.fetchDepartments());
    }
  }
}