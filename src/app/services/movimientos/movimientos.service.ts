import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Movimiento {
  id_movimiento?: number;
  id_usuario?: number;
  nombre_prenda?: string;

  cantidad: number;
  descripcion?: string;
  fecha?: string;

  // Nuevos campos
  desde_tipo?: 'roperia' | 'lavanderia' | 'reproceso' | 'unidad' | 'baja';
  hacia_tipo?: 'roperia' | 'lavanderia' | 'reproceso' | 'unidad' | 'baja';
  desde_unidad?: { id_unidad: number; nombre_unidad: string };  
  hacia_unidad?: { id_unidad: number; nombre_unidad: string };

  // Relaciones
  usuario?: { id: number; nombre_usuario: string };
  prenda?: { id_prenda: number; nombre: string };
  reproceso?: { id_reproceso: number; descripcion: string };
  baja?: { id_baja: number; motivo: string };
}

export interface PaginacionResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) {}

  //Movimientos con paginación
  getMovimientos(page = 1, limit = 20): Observable<PaginacionResponse<Movimiento>> {
    return this.http.get<PaginacionResponse<Movimiento>>(
      `${this.apiUrl}?page=${page}&limit=${limit}`
    );
  }

  addMovimiento(mov: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, mov);
  }

  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Listas auxiliares
  getUsuarios() { return this.http.get<any>(`${environment.apiUrl}/usuarios`); }
  getRoperias() { return this.http.get<any>(`${environment.apiUrl}/roperias`); }
  getLavanderias() { return this.http.get<any>(`${environment.apiUrl}/lavanderias`); }
  getUnidades() { return this.http.get<any>(`${environment.apiUrl}/unidades-clinicas`); }
  getReprocesos() { return this.http.get<any>(`${environment.apiUrl}/reprocesos`); }
  getReparaciones() { return this.http.get<any>(`${environment.apiUrl}/reparaciones`); }
  getBajas() { return this.http.get<any>(`${environment.apiUrl}/bajas`); }
  getPrendas() { return this.http.get<any>(`${environment.apiUrl}/prendas`); }
}
