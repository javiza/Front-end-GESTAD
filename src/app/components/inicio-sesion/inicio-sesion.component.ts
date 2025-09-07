import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonSpinner
} from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss'],
  standalone: true,
  imports: [FormsModule, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonSpinner],
})
export class InicioSesionComponent implements OnInit {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    console.log('InicioSesionComponent cargado');
    this.resetForm(); // limpia email, password y errorMessage
  }

  login() {
  this.loading = true;
  this.errorMessage = '';

  this.authService.login(this.email, this.password).subscribe({
    next: (res) => {
      // Guardar token
      localStorage.setItem('token', res.access_token);
      this.loading = false;

      // Limpiar formulario antes de navegar
      this.resetForm();

      // Redirigir según rol y reemplazar URL para que "atrás" no vuelva al login
      if (res.user.rol === 'administrador') {
        this.router.navigate(['/administrador'], { replaceUrl: true });
      } else if (res.user.rol === 'usuario') {
        this.router.navigate(['/ingresos'], { replaceUrl: true });
      } else {
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    },
    error: (err) => {
      console.error('Error en login:', err);
      this.errorMessage = 'Usuario o contraseña incorrectos';
      this.loading = false;
    },
  });
}



  // Método público para llamar desde otro componente
  public resetForm() {
    this.email = '';
    this.password = '';
    this.errorMessage = '';
  }
}
