import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    nombre_usuario: string;
    email: string;
    rol: 'administrador' | 'usuario';
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  // 👉 Guardar token + usuario en localStorage
  saveSession(res: LoginResponse) {
    localStorage.setItem('token', res.access_token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
 getUserId(): number {
  const token = this.getToken();
  if (!token) return 0;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return Number(payload.sub);   // conversion correcta
}


}
