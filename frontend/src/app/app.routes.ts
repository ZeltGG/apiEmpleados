import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/login/login.component';
import { RegisterComponent } from '@pages/register/register.component';
import { EmployeesListComponent } from '@pages/employees/employees-list.component';
import { EmployeeCreateComponent } from '@pages/employees/employee-create.component';
import { EmployeesEditComponent } from '@pages/employees/employees-edit.component';
import { DepartmentsEditComponent } from '@pages/departments/departments-edit.component';
import { AuthGuard } from '@pages/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // 🔐 Rutas protegidas por AuthGuard
  { path: 'employees', component: EmployeesListComponent, canActivate: [AuthGuard] },
  { path: 'employees/create', component: EmployeeCreateComponent, canActivate: [AuthGuard] },
  { path: 'employees/edit/:id', component: EmployeesEditComponent, canActivate: [AuthGuard] },
  { path: 'departments/edit/:id', component: DepartmentsEditComponent, canActivate: [AuthGuard] },

  {
    path: 'departments',
    loadComponent: () =>
      import('@pages/departments/departments-list.component').then(
        (m) => m.DepartmentsListComponent
      ),
    canActivate: [AuthGuard]
  },

  // 🚨 Ruta comodín para páginas no encontradas
  { path: '**', redirectTo: 'login' }
];