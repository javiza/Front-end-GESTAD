import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonIcon
} from '@ionic/angular/standalone';
import { UnidadService, UnidadClinica, CreateUnidadClinica } from 'src/app/services/unidad/unidad.service';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-unidad-clinica',
  templateUrl: './unidad-clinica.component.html',
  styleUrls: ['./unidad-clinica.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonList,
    IonIcon
  ],
})
export class UnidadClinicaComponent implements OnInit {
  // lista de unidades
  unidades: UnidadClinica[] = [];

  // formulario
  id: number | null = null;
  nombre_unidad = '';
  anexo = '';
  nombre_encargado = '';

  constructor(private unidadService: UnidadService) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarUnidades();
  }

  // Crear o actualizar
  ingresarUnidad() {
    const payload: CreateUnidadClinica = {
      nombre_unidad: this.nombre_unidad,
      anexo: this.anexo,
      nombre_encargado: this.nombre_encargado,
    };

    if (this.id) {
      // actualizar
      this.unidadService.update(this.id, payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarUnidades();
        },
        error: (err) => console.error('Error al actualizar unidad clínica:', err),
      });
    } else {
      // crear
      this.unidadService.create(payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarUnidades();
        },
        error: (err) => console.error('Error al crear unidad clínica:', err),
      });
    }
  }

  // Cargar todas las unidades
cargarUnidades() {
  this.unidadService.findAll().subscribe({
    next: (res: any) => {
      console.log('Respuesta completa:', res);
      this.unidades = res.data; // ⚡ aquí está el array real
    },
    error: (err) => console.error('Error al cargar unidades:', err),
  });
}



  // Editar
  editarUnidad(unidad: UnidadClinica) {
    this.id = unidad.id_unidad;
    this.nombre_unidad = unidad.nombre_unidad;
    this.anexo = unidad.anexo;
    this.nombre_encargado = unidad.nombre_encargado;
  }

  // Eliminar
  eliminarUnidad(unidad: UnidadClinica) {
    if (!confirm(`¿Seguro que deseas eliminar la unidad "${unidad.nombre_unidad}"?`)) {
      return;
    }
    this.unidadService.remove(unidad.id_unidad).subscribe({
      next: () => this.cargarUnidades(),
      error: (err) => console.error('Error al eliminar unidad clínica:', err),
    });
  }

  // Limpiar formulario
  limpiarFormulario() {
    this.id = null;
    this.nombre_unidad = '';
    this.anexo = '';
    this.nombre_encargado = '';
  }
}
