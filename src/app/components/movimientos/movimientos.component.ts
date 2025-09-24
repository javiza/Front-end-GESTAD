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
  editandoId: number | null = null;

  // Listas para selects
  usuarios: {id:number, nombre_usuario:string}[] = [];
  roperias: {id_roperia:number, nombre_encargado:string}[] = [];
  lavanderias: {id_lavanderia:number, nombre:string}[] = [];
  unidades: {id_unidad:number, nombre_unidad:string}[] = [];
  reprocesos: {id_reproceso:number, descripcion:string}[] = [];
  reparaciones: {id_reparacion:number, descripcion:string}[] = [];
  bajas: {id_baja:number, motivo:string}[] = [];

  constructor(
    private fb: FormBuilder,
    private movimientosService: MovimientosService
  ) {
    this.movimientoForm = this.fb.group({
      id_usuario: [null, Validators.required],
      tipo_movimiento: ['roperia', Validators.required],
      operacion: ['entrada', Validators.required],
      id_prenda: [null, Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      observacion: [''],
      id_roperia: [null],
      id_lavanderia: [null],
      id_reproceso: [null],
      id_unidad: [null],
      id_reparacion: [null],
      id_baja: [null],
    });
  }

  ngOnInit() {
    this.cargarMovimientos();
    this.cargarListas();
    this.movimientoForm.get('tipo_movimiento')?.valueChanges.subscribe(() => {
      this.limpiarIdsRelacionales();
    });
  }

  cargarMovimientos() {
    this.movimientosService.getMovimientos().subscribe({
      next: (data) => this.movimientos = data,
      error: (err) => console.error('Error al obtener movimientos', err)
    });
  }

  cargarListas() {
    this.movimientosService.getUsuarios().subscribe(data => this.usuarios = data);
    this.movimientosService.getRoperias().subscribe(data => this.roperias = data);
    this.movimientosService.getLavanderias().subscribe(data => this.lavanderias = data);
    this.movimientosService.getUnidades().subscribe(data => this.unidades = data);
    this.movimientosService.getReprocesos().subscribe(data => this.reprocesos = data);
    this.movimientosService.getReparaciones().subscribe(data => this.reparaciones = data);
    this.movimientosService.getBajas().subscribe(data => this.bajas = data);
  }

  guardarMovimiento() {
    if (this.movimientoForm.invalid) return;
    this.limpiarIdsRelacionales();

    const obs$ = this.editandoId
      ? this.movimientosService.updateMovimiento(this.editandoId, this.movimientoForm.value)
      : this.movimientosService.addMovimiento(this.movimientoForm.value);

    obs$.subscribe({
      next: () => {
        this.resetForm();
        this.cargarMovimientos();
      },
      error: err => console.error('Error al guardar/actualizar movimiento', err)
    });
  }

  editarMovimiento(mov: Movimiento) {
    this.editandoId = mov.id_movimiento ?? null;
    this.movimientoForm.patchValue({
      id_usuario: mov.id_usuario,
      tipo_movimiento: mov.tipo_movimiento,
      operacion: mov.operacion,
      id_prenda: mov.id_prenda,
      cantidad: mov.cantidad,
      observacion: mov.observacion || '',
      id_roperia: mov.id_roperia || null,
      id_lavanderia: mov.id_lavanderia || null,
      id_reproceso: mov.id_reproceso || null,
      id_unidad: mov.id_unidad || null,
      id_reparacion: mov.id_reparacion || null,
      id_baja: mov.id_baja || null,
    });
  }

  eliminarMovimiento(mov: Movimiento) {
    if (!mov.id_movimiento) return;
    if (confirm('¿Eliminar este movimiento?')) {
      this.movimientosService.deleteMovimiento(mov.id_movimiento).subscribe({
        next: () => this.cargarMovimientos(),
        error: err => console.error('Error al eliminar movimiento', err)
      });
    }
  }

  private resetForm() {
    this.movimientoForm.reset({
      id_usuario: null,
      tipo_movimiento: 'roperia',
      operacion: 'entrada',
      id_prenda: null,
      cantidad: 1,
      observacion: '',
      id_roperia: null,
      id_lavanderia: null,
      id_reproceso: null,
      id_unidad: null,
      id_reparacion: null,
      id_baja: null,
    });
    this.editandoId = null;
  }

  private limpiarIdsRelacionales() {
    const tipo = this.movimientoForm.value.tipo_movimiento;
    const campos = ['id_roperia', 'id_lavanderia', 'id_reproceso', 'id_unidad', 'id_reparacion', 'id_baja'];
    campos.forEach(campo => {
      if (campo !== `id_${tipo}`) this.movimientoForm.get(campo)?.setValue(null);
    });
  }
}
