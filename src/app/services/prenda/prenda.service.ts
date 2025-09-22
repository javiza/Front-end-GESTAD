import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';

export interface Prenda {
  id_prenda: number;
  nombre: string;
  detalle?: string;
  tipo: string;
  peso?: number;
  cantidad?: number;      // viene de inventario
  fechaIngreso?: string;  // viene de inventario
}

@Injectable({
  providedIn: 'root',
})
export class PrendaService {
  private apiUrl = 'http://localhost:3000/prendas';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  // Obtener todas las prendas y mapear la fecha
 findAll(): Observable<Prenda[]> {
  return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
    map((data) =>
      data.map((p) => ({
        id_prenda: p.id_prenda,
        nombre: p.nombre,
        detalle: p.detalle,
        tipo: p.tipo,
        peso: p.peso,
        cantidad: p.cantidad ?? 0,
        fechaIngreso: p.fechaIngreso
          ? new Date(p.fechaIngreso).toISOString()
          : undefined,
      }))
    )
  );
}




  


update(id: number, prenda: Partial<Prenda>): Observable<Prenda> {
  return this.http.put<any>(`${this.apiUrl}/${id}`, prenda, { headers: this.getHeaders() }).pipe(
    map((p) => ({
      id_prenda: p.id_prenda,
      nombre: p.nombre,
      detalle: p.detalle,
      tipo: p.tipo,
      peso: p.peso,
      cantidad: p.inventario?.cantidad ?? 0,
      fechaIngreso: p.inventario?.fecha_ingreso
        ? new Date(p.inventario.fecha_ingreso).toISOString()
        : undefined,
    }))
  );
}

remove(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
}
// Crear prenda con movimiento inicial en ropería   // Crear prenda sin enviar fecha (la asigna backend)
createWithMovimiento(prenda: Partial<Prenda>, id_usuario: number): Observable<Prenda> {
  const payload = {
    nombre: prenda.nombre,
    detalle: prenda.detalle,
    tipo: prenda.tipo,
    peso: prenda.peso ?? 0.5,  // o valor por defecto
    cantidad: prenda.cantidad ?? 1,
    id_usuario: id_usuario,   // obligatorio
  };

  return this.http.post<any>(`${this.apiUrl}/ingresar`, payload, { headers: this.getHeaders() }).pipe(
    map((p) => ({
      id_prenda: p.prenda.id_prenda,
      nombre: p.prenda.nombre,
      detalle: p.prenda.detalle,
      tipo: p.prenda.tipo,
      peso: p.prenda.peso,
      cantidad: payload.cantidad,
      fechaIngreso: new Date().toISOString(),
    }))
  );
}

}
