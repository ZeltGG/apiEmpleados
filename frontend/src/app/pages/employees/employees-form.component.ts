import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Nuevo Empleado</h2>
      <form (ngSubmit)="createEmployee()">
        <input [(ngModel)]="codigo" name="codigo" placeholder="Código" required>
        <input [(ngModel)]="nombre" name="nombre" placeholder="Nombre" required>
        <input [(ngModel)]="apellido1" name="apellido1" placeholder="Primer apellido" required>
        <input [(ngModel)]="apellido2" name="apellido2" placeholder="Segundo apellido" required>
        <input [(ngModel)]="codigo_departamento" name="codigo_departamento" placeholder="Código departamento" required>
        <button type="submit">Guardar</button>
      </form>
      <p *ngIf="successMsg" class="success">{{ successMsg }}</p>
      <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
    </div>
  `,
  styles: [`
    .container { max-width: 400px; margin: auto; padding: 20px; text-align: center; }
    input { display: block; margin: 10px auto; padding: 5px; width: 90%; }
    button { padding: 8px 15px; }
    .success { color: green; }
    .error { color: red; }
  `]
})
export class EmployeesFormComponent {
  codigo = '';
  nombre = '';
  apellido1 = '';
  apellido2 = '';
  codigo_departamento = '';
  successMsg = '';
  errorMsg = '';

  constructor(private employeeService: EmployeeService) {}

  createEmployee() {
    const data = {
      codigo: Number(this.codigo),
      nombre: this.nombre,
      apellido1: this.apellido1,
      apellido2: this.apellido2,
      codigo_departamento: Number(this.codigo_departamento),
    };

    this.employeeService.createEmployee(data).subscribe({
      next: () => {
        this.successMsg = 'Empleado creado con éxito';
        this.errorMsg = '';
        this.codigo = this.nombre = this.apellido1 = this.apellido2 = this.codigo_departamento = '';
      },
      error: (err) => {
        this.errorMsg = err.error?.msg || 'Error al crear empleado';
        this.successMsg = '';
      }
    });
  }
}