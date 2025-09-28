import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { InventarioService } from 'src/app/services/inventarios/inventario.service';

@Component({
  selector: 'app-inventario-nombre',
  templateUrl: './inventario-nombre.component.html',
  styleUrls: ['./inventario-nombre.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class InventarioNombreComponent  implements OnInit {
 resultados: any[] = [];
  buscando = false;
  termino = '';
  constructor(private inventarioService: InventarioService) { }

  ngOnInit() {}

  buscar() {
  if (!this.termino.trim()) {
    this.resultados = [];
    return;
  }
  this.buscando = true;

  this.inventarioService.buscarPorNombre(this.termino).subscribe({
    next: (resp) => {
      // resp es un array plano con objetos { nombre, tipo_entidad, unidad, cantidad }
      const mapa = new Map<string, number>();

      resp.forEach(item => {
        // Clave: si tiene unidad usamos el nombre, si no, el tipo_entidad
        const clave = item.unidad?.nombre_unidad 
          ? `Unidad: ${item.unidad.nombre_unidad}` 
          : item.tipo_entidad;

        const cantidadActual = mapa.get(clave) || 0;
        mapa.set(clave, cantidadActual + item.cantidad);
      });

      // Convertir a array de objetos { clave, cantidad }
      this.resultados = Array.from(mapa, ([clave, cantidad]) => ({ clave, cantidad }));

      this.buscando = false;
    },
    error: (err) => {
      console.error('Error en búsqueda', err);
      this.buscando = false;
    },
  });
}


}
