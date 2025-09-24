import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonIcon,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonList,
} from '@ionic/angular/standalone';
import { PrendaService, Prenda } from '../../services/prenda/prenda.service';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-prenda',
  templateUrl: './prenda.component.html',
  styleUrls: ['./prenda.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonList,
    DatePipe,
  ],
})
export class PrendaComponent implements OnInit {
  nombre_prenda = '';
  cantidad: number | null = null;
  tipo = '';
  detalle = '';
  peso: number | null = null;

  prendas: Prenda[] = [];
  editandoId: number | null = null; // id de la prenda en edición

  constructor(private prendaService: PrendaService, private authService: AuthService) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarPrendas();
  }

  cargarPrendas() {
    this.prendaService.findAll().subscribe({
      next: (data) => {
        this.prendas = data || [];
      },
      error: (err) => console.error('Error cargando prendas:', err),
    });
  }

  ingresarPrenda() {
  if (!this.nombre_prenda || !this.cantidad || !this.tipo || !this.peso) {
    return;
  }

  const prendaData: Partial<Prenda> = {
    nombre: this.nombre_prenda,
    cantidad: this.cantidad ? Number(this.cantidad) : 1,
    detalle: this.detalle,
    tipo: this.tipo,
    peso: this.peso ? Number(this.peso) : 0.5,
  };

  console.log('Payload a enviar:', prendaData);

  if (this.editandoId !== null) {
    this.prendaService.update(this.editandoId, prendaData).subscribe({
      next: () => {
        this.resetForm();
        this.cargarPrendas();
      },
      error: (err) => console.error('Error al actualizar prenda:', err),
    });
  } else {
    const id_usuario = this.authService.getUserId(); 
    console.log('ID usuario obtenido del token:', id_usuario);
    this.prendaService.createWithMovimiento(prendaData, id_usuario).subscribe({
      next: () => {
        this.resetForm();
        this.cargarPrendas();
      },
      error: (err) => console.error('Error al ingresar prenda:', err),
    });
  }
}



  editarPrenda(prenda: Prenda) {
    this.editandoId = prenda.id_prenda;
    this.nombre_prenda = prenda.nombre;
    this.cantidad = prenda.cantidad ?? null;
    this.tipo = prenda.tipo;
    this.detalle = prenda.detalle ?? '';
  }

  eliminarPrenda(prenda: Prenda) {
    if (confirm('¿Eliminar esta prenda?')) {
      this.prendaService.remove(prenda.id_prenda).subscribe({
        next: () => this.cargarPrendas(),
        error: (err) => console.error('Error al eliminar prenda:', err),
      });
    }
  }

  private resetForm() {
  this.nombre_prenda = '';
  this.cantidad = null;
  this.tipo = '';
  this.detalle = '';
  this.peso = null;
  this.editandoId = null;
}

}
