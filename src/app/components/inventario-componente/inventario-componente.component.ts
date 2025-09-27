import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventarioService, Prenda } from 'src/app/services/inventarios/inventario.service';


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
        this.prendas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar inventario', err);
        this.cargando = false;
      }
    });
  }
}