import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Crear Cuenta</h2>

        <form (ngSubmit)="register()" class="form">
          <input
            type="email"
            [(ngModel)]="email"
            name="email"
            placeholder="Correo electrónico"
            required
          />
          <input
            type="password"
            [(ngModel)]="password"
            name="password"
            placeholder="Contraseña"
            required
          />
          <button type="submit">Registrarse</button>

          <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
        </form>

        <p class="register-link">
          ¿Ya tienes una cuenta?
          <a [routerLink]="['/login']">Inicia sesión</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: #f2f4f7;
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
      text-align: center;
    }

    h2 {
      margin-bottom: 1rem;
    }

    .form input {
      width: 100%;
      padding: 0.75rem;
      margin: 0.5rem 0;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }

    .form button {
      width: 100%;
      padding: 0.75rem;
      background-color: #1e88e5;
      color: white;
      font-weight: bold;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 1rem;
    }

    .form button:hover {
      background-color: #1565c0;
    }

    .error {
      color: red;
      margin-top: 0.5rem;
    }

    .register-link {
      margin-top: 1rem;
    }

    .register-link a {
      color: #1e88e5;
      text-decoration: none;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.errorMsg = err.error?.msg || 'Error al registrar usuario';
      }
    });
  }
}