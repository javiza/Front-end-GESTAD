import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Movimiento {
  id_movimiento?: number;
  id_usuario: number;
  tipo_movimiento: 'roperia' | 'lavanderia' | 'reproceso' | 'unidad_clinica' | 'reparacion' | 'baja';
  operacion: 'entrada' | 'salida';
  id_lavanderia?: number;
  id_reproceso?: number;
  id_unidad?: number;
  id_reparacion?: number;
  id_baja?: number;
  id_prenda: number;
  id_roperia?: number;
  observacion?: string;
  cantidad: number;
  fecha?: string;

  // relaciones cargadas opcionales
  prenda?: { id_prenda: number; nombre: string };
  usuario?: { id: number; nombre_usuario: string };
  roperia?: { id_roperia: number; nombre_encargado: string };
  lavanderia?: { id_lavanderia: number; nombre: string };
  reproceso?: { id_reproceso: number; descripcion: string };
  unidad?: { id_unidad: number; nombre_unidad: string };
  reparacion?: { id_reparacion: number; descripcion: string };
  baja?: { id_baja: number; motivo: string };
}

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl = `${environment.apiUrl}/movimientos`; 
  constructor(private http: HttpClient) {}

  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }

  addMovimiento(mov: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, mov);
  }

  updateMovimiento(id: number, mov: Movimiento): Observable<Movimiento> {
    return this.http.put<Movimiento>(`${this.apiUrl}/${id}`, mov);
  }

  deleteMovimiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Nuevos: traer datos para selects
  getUsuarios(): Observable<{id:number, nombre_usuario:string}[]> {
    return this.http.get<{id:number, nombre_usuario:string}[]>(`${environment.apiUrl}/usuarios`);
  }

  getRoperias(): Observable<{id_roperia:number, nombre_encargado:string}[]> {
    return this.http.get<{id_roperia:number, nombre_encargado:string}[]>(`${environment.apiUrl}/roperias`);
  }

  getLavanderias(): Observable<{id_lavanderia:number, nombre:string}[]> {
    return this.http.get<{id_lavanderia:number, nombre:string}[]>(`${environment.apiUrl}/lavanderias`);
  }

  getUnidades(): Observable<{id_unidad:number, nombre_unidad:string}[]> {
    return this.http.get<{id_unidad:number, nombre_unidad:string}[]>(`${environment.apiUrl}/unidades_clinicas`);
  }

  getReprocesos(): Observable<{id_reproceso:number, descripcion:string}[]> {
    return this.http.get<{id_reproceso:number, descripcion:string}[]>(`${environment.apiUrl}/reprocesos`);
  }

  getReparaciones(): Observable<{id_reparacion:number, descripcion:string}[]> {
    return this.http.get<{id_reparacion:number, descripcion:string}[]>(`${environment.apiUrl}/reparaciones`);
  }

  getBajas(): Observable<{id_baja:number, motivo:string}[]> {
    return this.http.get<{id_baja:number, motivo:string}[]>(`${environment.apiUrl}/bajas`);
  }
}