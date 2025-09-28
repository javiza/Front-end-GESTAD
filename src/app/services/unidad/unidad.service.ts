import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

export interface UnidadClinica {
  id_unidad: number;
  nombre_unidad: string;
  anexo: string;
  nombre_encargado: string;
  fecha_creacion?: string;
}

export interface CreateUnidadClinica {
  nombre_unidad: string;
  anexo: string;
  nombre_encargado: string;
}

@Injectable({
  providedIn: 'root'
})
export class UnidadService {
  private apiUrl = `${environment.apiUrl}/unidades-clinicas`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // Crear unidad clínica
  create(dto: CreateUnidadClinica): Observable<UnidadClinica> {
    return this.http.post<UnidadClinica>(this.apiUrl, dto, {
      headers: this.getHeaders(),
    });
  }

  // Obtener todas las unidades
  findAll(): Observable<UnidadClinica[]> {
    return this.http.get<UnidadClinica[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  // Actualizar unidad clínica
  update(id: number, dto: CreateUnidadClinica): Observable<UnidadClinica> {
    return this.http.put<UnidadClinica>(`${this.apiUrl}/${id}`, dto, {
      headers: this.getHeaders(),
    });
  }

  // Eliminar unidad clínica
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
