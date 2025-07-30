import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h2>Iniciar Sesión</h2>

        <form (ngSubmit)="login()" class="form">
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

          <button type="submit">Ingresar</button>

          <p *ngIf="errorMsg" class="error">{{ errorMsg }}</p>
        </form>

        <p class="register-link">
          ¿No tienes una cuenta?
          <a [routerLink]="['/register']">Regístrate</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-wrapper {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f1f5f9;
      padding: 20px;
    }

    .login-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 40px;
      max-width: 400px;
      width: 100%;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    }

    h2 {
      text-align: center;
      margin-bottom: 24px;
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
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 10px;
      font-size: 15px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s ease-in-out;
    }

    .form button:hover {
      background-color: #1e40af;
    }

    .error {
      color: #dc2626;
      margin-top: 10px;
      text-align: center;
    }

    .register-link {
      text-align: center;
      margin-top: 20px;
      font-size: 14px;
    }

    .register-link a {
      color: #2563eb;
      text-decoration: none;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMsg = '';

    if (!this.email || !this.password) {
      this.errorMsg = 'Todos los campos son obligatorios.';
      return;
    }

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        if (res.token) {
          this.authService.saveToken(res.token);
          this.router.navigate(['/employees']);
        } else {
          this.errorMsg = 'Error: no se recibió token del servidor.';
          console.warn('⚠️ Respuesta inesperada en login:', res);
        }
      },
      error: (err) => {
        console.error('❌ Error de login:', err);
        this.errorMsg = err.error?.msg || 'Credenciales inválidas o error del servidor.';
      }
    });
  }
}