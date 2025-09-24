import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';
export interface Prenda {
  id: string;
  nombre: string;
  cantidad: number;
  descripcion: string;
  tipo: string;
  fechaIngreso: string;
}

@Injectable({
  providedIn: 'root',
})
export class LavanderiaService {
  private apiUrl = `${environment.apiUrl}/lavanderia`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  findAll(): Observable<Prenda[]> {
    return this.http.get<Prenda[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  create(prenda: Partial<Prenda>): Observable<Prenda> {
    return this.http.post<Prenda>(this.apiUrl, prenda, { headers: this.getHeaders() });
  }

  update(id: string, prenda: Partial<Prenda>): Observable<Prenda> {
    return this.http.patch<Prenda>(`${this.apiUrl}/${id}`, prenda, { headers: this.getHeaders() });
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}