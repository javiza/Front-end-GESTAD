import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventarioService, Prenda, Inventario } from 'src/app/services/inventarios/inventario.service';


@Component({
  selector: 'app-inventario-componente',
  templateUrl: './inventario-componente.component.html',
  styleUrls: ['./inventario-componente.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]

})
export class InventarioComponenteComponent  implements OnInit {

  prendas: Prenda[] = [];
  cargando = true;

  constructor(private inventarioService: InventarioService) {}

 ngOnInit() {
  this.inventarioService.getInventarioGeneral().subscribe({
    next: (data) => {
      this.prendas = this.agruparPrendas(data);
      this.cargando = false;
    },
    error: (err) => {
      console.error('Error al cargar inventario', err);
      this.cargando = false;
    }
  });
}
private agruparPrendas(prendas: Prenda[]): Prenda[] {
  const map = new Map<string, Prenda>();

  for (const prenda of prendas) {
    if (!map.has(prenda.nombre)) {
      // Guarda la prenda con sus inventarios agrupados
      map.set(prenda.nombre, {
        ...prenda,
        inventarios: this.agruparInventarios(prenda.inventarios)
      });
    } else {
     
      const existente = map.get(prenda.nombre)!;
      const nuevos = this.agruparInventarios(prenda.inventarios);

      for (const inv of nuevos) {
        const mismo = existente.inventarios.find(
          i =>
            i.tipo_entidad === inv.tipo_entidad &&
            i.unidad?.id_unidad === inv.unidad?.id_unidad
        );
        if (mismo) {
          mismo.cantidad += inv.cantidad;
          mismo.ultima_actualizacion = inv.ultima_actualizacion; // opcional: actualizar fecha
        } else {
          existente.inventarios.push({ ...inv });
        }
      }
    }
  }

  return Array.from(map.values());
}

//  Nueva función para agrupar inventarios de una prenda
private agruparInventarios(inventarios: Inventario[]): Inventario[] {
  const map = new Map<string, Inventario>();

  for (const inv of inventarios) {
    const key = `${inv.tipo_entidad}-${inv.unidad?.id_unidad ?? 'null'}`;
    if (!map.has(key)) {
      map.set(key, { ...inv });
    } else {
      const existente = map.get(key)!;
      existente.cantidad += inv.cantidad;
      existente.ultima_actualizacion = inv.ultima_actualizacion; // actualiza con la más reciente
    }
  }

  return Array.from(map.values());
}

}