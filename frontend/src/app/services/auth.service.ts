import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:4000/api/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // ✅ Registro de usuario
  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // ✅ Login de usuario
  login(user: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  // ✅ Guardar token en localStorage
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // ✅ Obtener token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // ✅ Eliminar token (logout)
  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  // ✅ Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}