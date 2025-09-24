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
}

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl = `${environment.apiUrl}/lavanderia`; // cambia por tu backend

  constructor(private http: HttpClient) {}

  getMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.apiUrl);
  }

  addMovimiento(mov: Movimiento): Observable<Movimiento> {
    return this.http.post<Movimiento>(this.apiUrl, mov);
  }
}
