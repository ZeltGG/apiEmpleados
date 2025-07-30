import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" *ngIf="authService.isAuthenticated()">
      <div class="navbar-container">
        <div class="brand">FredImportaciones</div>
        <div class="nav-links">
          <a routerLink="/employees" routerLinkActive="active">Empleados</a>
          <a routerLink="/departments" routerLinkActive="active">Departamentos</a>
          <button (click)="logout()">Cerrar sesión</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #1e88e5;
      color: white;
      padding: 0.75rem 1.5rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .navbar-container {
      max-width: 1200px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      font-weight: bold;
      font-size: 1.2rem;
    }

    .nav-links a,
    .nav-links button {
      color: white;
      text-decoration: none;
      margin-left: 1rem;
      font-size: 1rem;
      background: none;
      border: none;
      cursor: pointer;
    }

    .nav-links a:hover,
    .nav-links button:hover {
      text-decoration: underline;
    }

    .nav-links .active {
      font-weight: bold;
      text-decoration: underline;
    }
  `]
})
export class NavbarComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}