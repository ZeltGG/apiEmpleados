import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-departments-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="edit-wrapper">
      <div class="edit-card">
        <h2>Editar Departamento</h2>

        <form *ngIf="department" (ngSubmit)="updateDepartment()" class="form">
          <input
            type="number"
            [(ngModel)]="department.codigo"
            name="codigo"
            placeholder="Código del Departamento"
            required
          />
          <input
            [(ngModel)]="department.nombre"
            name="nombre"
            placeholder="Nombre del Departamento"
            required
          />

          <button type="submit">Actualizar</button>

          <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .edit-wrapper {
      min-height: 100vh;
      background: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .edit-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 40px;
      width: 100%;
      max-width: 500px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
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
      margin-top: 10px;
      text-align: center;
    }
  `]
})
export class DepartmentsEditComponent implements OnInit {
  department: any = null;
  errorMsg = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.departmentService.getDepartmentById(id).subscribe({
        next: (res) => this.department = res,
        error: () => this.errorMsg = 'Error al cargar el departamento'
      });
    }
  }

  updateDepartment() {
    if (!this.department?.codigo || !this.department?.nombre) {
      this.errorMsg = 'Todos los campos son obligatorios';
      return;
    }

    this.departmentService.updateDepartment(this.department._id, this.department).subscribe({
      next: () => this.router.navigate(['/departments']),
      error: () => this.errorMsg = 'Error al actualizar departamento'
    });
  }
}