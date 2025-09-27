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
        this.resultados = resp;
        this.buscando = false;
      },
      error: (err) => {
        console.error('Error en búsqueda', err);
        this.buscando = false;
      },
    });
  }

}
