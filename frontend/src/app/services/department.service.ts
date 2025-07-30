import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:4000/api/departments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders() {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // ✅ Obtener todos los departamentos
  getDepartments(): Observable<any> {
    return this.http.get(this.apiUrl, this.getHeaders());
  }

  // ✅ Crear nuevo departamento
  createDepartment(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, this.getHeaders());
  }

  // ✅ Eliminar departamento
  deleteDepartment(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // ✅ Obtener un departamento por ID
  getDepartmentById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  // ✅ Actualizar departamento por ID
  updateDepartment(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data, this.getHeaders());
  }
}