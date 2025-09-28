import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovimientosService, Movimiento } from 'src/app/services/movimientos/movimientos.service';
import { AuthService } from 'src/app/services/auth.service';
import { InventarioService } from 'src/app/services/inventarios/inventario.service';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-movimientos-componente',
  templateUrl: './movimientos-componente.component.html',
  styleUrls: ['./movimientos-componente.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
})
export class MovimientosComponenteComponent implements OnInit {
  movimientoForm: FormGroup;
  movimientos: Movimiento[] = [];
  total = 0;
  page = 1;
  totalPages = 1;
  limit = 20;

  editandoId: number | null = null;

  // Listas para selects
  usuarios: any[] = [];
  roperias: any[] = [];
  lavanderias: any[] = [];
  unidades: any[] = [];
  reprocesos: any[] = [];
  reparaciones: any[] = [];
  bajas: any[] = [];
  prendas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private movimientosService: MovimientosService,
    private authService: AuthService,
    private inventarioService: InventarioService   //inyecto InventarioService
  ) {
    addIcons({
      'create-outline': createOutline,
      'trash-outline': trashOutline
    });

    this.movimientoForm = this.fb.group({
      cantidad: [1, [Validators.required, Validators.min(1)]],
      descripcion: [''],
      nombre_prenda: [null, Validators.required],   // prenda por nombre
      desde_tipo: ['roperia', Validators.required],
      hacia_tipo: ['lavanderia', Validators.required],
      hacia_id_unidad: [null],
      id_reproceso: [null],
      id_baja: [null],
    });
  }

  ngOnInit() {
    const usuarioId = this.authService.getUserId();
    if (usuarioId) {
      this.movimientoForm.patchValue({ id_usuario: usuarioId });
    }
    this.cargarMovimientos();
    this.cargarListas();

    this.movimientoForm.get('hacia_tipo')?.valueChanges.subscribe(() => {
      this.limpiarIdsRelacionales();
    });
  }

  cargarMovimientos(page = 1) {
    this.movimientosService.getMovimientos(page, this.limit).subscribe({
      next: (resp: any) => {
        if (Array.isArray(resp)) {
          this.movimientos = resp;
          this.total = resp.length;
          this.page = 1;
          this.totalPages = 1;
        } else {
          this.movimientos = resp.data ?? [];
          this.total = resp.total ?? this.movimientos.length;
          this.page = resp.page ?? 1;
          this.totalPages = resp.totalPages ?? 1;
        }
      },
      error: (err) => console.error('Error al obtener movimientos', err),
    });
  }

  cargarListas() {
    this.movimientosService.getUsuarios().subscribe(d => this.usuarios = d.data ?? d);
    this.movimientosService.getUnidades().subscribe(d => this.unidades = d.data ?? d);
    this.movimientosService.getReprocesos().subscribe(d => this.reprocesos = d.data ?? d);
    this.movimientosService.getBajas().subscribe(d => this.bajas = d.data ?? d);
    this.movimientosService.getPrendas().subscribe(d => {
      const lista = d.data ?? d;
      // filtro para no repetir nombres de prenda
      this.prendas = lista.filter(
        (p: any, i: number, arr: any[]) => arr.findIndex(x => x.nombre === p.nombre) === i
      );
    });
  }

  guardarMovimiento() {
    if (this.movimientoForm.invalid) {
      return;
    }

    const { nombre_prenda, cantidad, desde_tipo } = this.movimientoForm.value;

    // 👉 verificar stock en origen antes de enviar al backend
    this.inventarioService.buscarPorNombre(nombre_prenda).subscribe({
      next: (resp) => {
        // buscar el stock en el origen
        const origen = resp.find(r => r.tipo_entidad === desde_tipo);

        if (origen && cantidad > origen.cantidad) {
          alert(`Stock insuficiente en ${desde_tipo}. Disponible: ${origen.cantidad}`);
          return;
        }

        // si hay stock suficiente, armar payload
        const payload: any = {
          nombre_prenda,
          cantidad,
          desde_tipo,
          hacia_tipo: this.movimientoForm.value.hacia_tipo,
          descripcion: this.movimientoForm.value.descripcion,
        };

        if (this.movimientoForm.value.hacia_tipo === 'unidad') {
          payload.hacia_id_unidad = this.movimientoForm.value.hacia_id_unidad;
        }

        this.movimientosService.addMovimiento(payload).subscribe({
          next: () => {
            this.cargarMovimientos(this.page);
            this.resetForm();
          },
          error: (err) => {
            alert(err.error?.message || 'Error al guardar movimiento');
            console.error('Error al guardar movimiento:', err);
          },
        });
      },
      error: (err) => {
        console.error('Error al verificar stock', err);
      },
    });
  }

  editarMovimiento(mov: Movimiento) {
    this.editandoId = mov.id_movimiento ?? null;
    this.movimientoForm.patchValue({
      nombre_prenda: mov.prenda?.nombre ?? '',
      cantidad: mov.cantidad,
      descripcion: mov.descripcion,
      desde_tipo: mov.desde_tipo,
      hacia_tipo: mov.hacia_tipo,
      hacia_id_unidad: mov.hacia_unidad?.id_unidad ?? null,
    });
  }

  eliminarMovimiento(mov: Movimiento) {
    if (!mov.id_movimiento) {
      return;
    }

    if (confirm(`¿Eliminar el movimiento de ${mov.cantidad} ${mov.prenda?.nombre || mov.nombre_prenda}?`)) {
      this.movimientosService.deleteMovimiento(mov.id_movimiento).subscribe({
        next: () => this.cargarMovimientos(this.page),
        error: (err) => console.error('Error al eliminar movimiento:', err),
      });
    }
  }

  resetForm() { /* ... */ }
  limpiarIdsRelacionales() { /* ... */ }
}
