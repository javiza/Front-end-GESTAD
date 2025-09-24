import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovimientosService, Movimiento } from 'src/app/services/movimientos/movimientos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class MovimientosComponent implements OnInit {
  movimientoForm: FormGroup;
  movimientos: Movimiento[] = [];

  constructor(
    private fb: FormBuilder,
    private movimientosService: MovimientosService
  ) {
    this.movimientoForm = this.fb.group({
      id_usuario: [1, Validators.required],
      tipo_movimiento: ['roperia', Validators.required],
      operacion: ['entrada', Validators.required],
      id_prenda: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      observacion: ['']
    });
  }

  ngOnInit() {
    this.cargarMovimientos();
  }

  cargarMovimientos() {
    this.movimientosService.getMovimientos().subscribe({
      next: (data) => this.movimientos = data,
      error: (err) => console.error('Error al obtener movimientos', err)
    });
  }

  guardarMovimiento() {
    if (this.movimientoForm.valid) {
      this.movimientosService.addMovimiento(this.movimientoForm.value).subscribe({
        next: (nuevo) => {
          this.movimientos.unshift(nuevo);
          this.movimientoForm.reset({
            id_usuario: 1,
            tipo_movimiento: 'roperia',
            operacion: 'entrada',
            cantidad: 1
          });
        },
        error: (err) => console.error('Error al guardar movimiento', err)
      });
    }
  }
}
