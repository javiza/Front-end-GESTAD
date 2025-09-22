import { CommonModule, DatePipe } from '@angular/common';
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
import { UsuariosService, Usuario } from 'src/app/services/usuarios/usuarios.service';
import { addIcons } from 'ionicons';
import { createOutline, trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-ingreso-usuario',
  templateUrl: './ingreso-usuario.component.html',
  styleUrls: ['./ingreso-usuario.component.scss'],
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
export class IngresoUsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];

  // formulario
  id: number | null = null;
  nombre_usuario = '';
  rut = '';
  email = '';
  password = '';
  rol: 'administrador' | 'usuario' = 'usuario';

  constructor(private usuariosService: UsuariosService) {
    addIcons({ createOutline, trashOutline });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.findAll().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Error al cargar usuarios:', err),
    });
  }

  ingresarUsuario() {
    if (!this.validarRut(this.rut)) {
      alert('RUT inválido. Verifica el formato.');
      return;
    }

    const payload: any = {
      nombre_usuario: this.nombre_usuario,
      email: this.email,
      rol: this.rol,
      rut: this.rut,
    };

    // 👉 Solo mandar password si el campo no está vacío
    if (this.password) {
      payload.password = this.password;
    }

    if (this.id) {
      // 🔹 Actualizar usuario
      this.usuariosService.update(this.id, payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarUsuarios();
        },
        error: (err) => console.error('Error al actualizar usuario:', err),
      });
    } else {
      // 🔹 Crear usuario → requiere password
      if (!this.password) {
        alert('Debes ingresar una contraseña para el nuevo usuario.');
        return;
      }
      this.usuariosService.create(payload).subscribe({
        next: () => {
          this.limpiarFormulario();
          this.cargarUsuarios();
        },
        error: (err) => console.error('Error al crear usuario:', err),
      });
    }
  }

  editarUsuario(usuario: Usuario) {
    this.id = usuario.id;
    this.nombre_usuario = usuario.nombre_usuario;
    this.email = usuario.email;
    this.rol = usuario.rol;
    this.rut = usuario.rut;
    this.password = ''; // no mostrar contraseña en edición
  }

  eliminarUsuario(usuario: Usuario) {
    if (!confirm(`¿Seguro que deseas eliminar a ${usuario.nombre_usuario}?`)) {
      return;
    }
    this.usuariosService.remove(usuario.id).subscribe({
      next: () => this.cargarUsuarios(),
      error: (err) => console.error('Error al eliminar usuario:', err),
    });
  }

  limpiarFormulario() {
    this.id = null;
    this.nombre_usuario = '';
    this.rut = '';
    this.email = '';
    this.password = '';
    this.rol = 'usuario';
  }

  validarRut(rut: string): boolean {
    if (!rut) return false;

    // limpiar rut (quitar puntos y guion)
    const rutLimpio = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

    // separar cuerpo y dv
    const cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1);

    if (!/^\d+$/.test(cuerpo)) return false;

    // calcular dv esperado
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    let dvFinal = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvFinal;
  }

  onRutInput(event: any) {
    const value = (event.target as HTMLInputElement).value ?? '';
    this.rut = this.formatearRut(value.toString());
  }

  formatearRut(rut: string): string {
    if (!rut) return '';

    let limpio = rut.replace(/[^0-9kK]/g, '').toUpperCase();
    let cuerpo = limpio.slice(0, -1);
    let dv = limpio.slice(-1);

    cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return cuerpo + '-' + dv;
  }
}
