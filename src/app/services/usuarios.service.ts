import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Usuario {
  id: string;
  nombre_usuario: string;
  email: string;
  rol: 'administrador' | 'usuario';
  activo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  findOne(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario, { headers: this.getHeaders() });
  }

  update(id: string, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario, { headers: this.getHeaders() });
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
