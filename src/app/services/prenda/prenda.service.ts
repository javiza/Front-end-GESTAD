import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

export interface Prenda {
  id_prenda: number;
  nombre: string;
  detalle?: string;
  peso?: number;
  cantidad?: number;      // viene de inventario
  fechaIngreso?: string;  // viene de inventario
}

@Injectable({
  providedIn: 'root',
})
export class PrendaService {
  private apiUrl = `${environment.apiUrl}/prendas`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener todas las prendas y mapear la fecha
// prenda.service.ts
findAll(): Observable<Prenda[]> {
  return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
    map((data) =>
      data.map((p) => {
        const inv = p.inventarios?.[p.inventarios.length - 1]; // último inventario
        return {
          id_prenda: p.id_prenda,
          nombre: p.nombre,
          detalle: p.detalle,
          peso: p.peso,
          cantidad: inv ? inv.cantidad : 0,
          fechaIngreso: inv ? new Date(inv.ultima_actualizacion).toISOString() : undefined,
        };
      })
    )
  );
}

createWithMovimiento(prenda: Partial<Prenda>, id_usuario: number): Observable<Prenda> {
  const payload = { ...prenda, id_usuario };
  return this.http.post<any>(`${this.apiUrl}`, payload, { headers: this.getHeaders() }).pipe(
    map((p) => {
      const inv = p.inventarios?.[p.inventarios.length - 1]; // último inventario
      return {
        id_prenda: p.id_prenda,
        nombre: p.nombre,
        detalle: p.detalle,
        peso: p.peso,
        cantidad: inv ? inv.cantidad : 0,
        fechaIngreso: inv ? new Date(inv.ultima_actualizacion).toISOString() : undefined,
      };
    })
  );
}


update(id: number, prenda: Partial<Prenda>): Observable<Prenda> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, prenda, { headers: this.getHeaders() }).pipe(
    map((p) => {
      const inv = p.inventarios?.[p.inventarios.length - 1]; // 👈 último inventario actualizado
      return {
        id_prenda: p.id_prenda,
        nombre: p.nombre,
        detalle: p.detalle,
        peso: p.peso,
        cantidad: inv ? inv.cantidad : 0,
        fechaIngreso: inv ? new Date(inv.ultima_actualizacion).toISOString() : undefined,
      };
    })
  );
}


remove(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
}
// Crear prenda con movimiento inicial en ropería   // Crear prenda sin enviar fecha (la asigna backend)



}
