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
}

export interface Inventario {
  id: number;
  tipo_entidad: 'roperia' | 'lavanderia' | 'unidad' | 'reproceso' | 'baja' | 'reparaciones';
  unidad?: UnidadClinica | null;
  cantidad: number;
  ultima_actualizacion: string;
}

export interface Prenda {
  id_prenda: number;
  nombre: string;
  detalle: string;
  peso: number;
  inventarios: Inventario[];
}

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = `${environment.apiUrl}/prendas`;
  private apiUrlNombre = `${environment.apiUrl}/inventarios`;

  constructor(private http: HttpClient, private authService: AuthService) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getInventarioGeneral(): Observable<Prenda[]> {
    return this.http.get<Prenda[]>(this.apiUrl);
  }
   buscarPorNombre(nombre: string) {
  return this.http.get<any[]>(`${this.apiUrlNombre}/buscar/nombre`, {
    params: { nombre },
    headers: this.getHeaders()
  });
}

}
