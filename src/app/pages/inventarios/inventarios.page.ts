import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonSegment,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { InventarioComponenteComponent } from '../../components/inventario-componente/inventario-componente.component';
import { InventarioNombreComponent } from 'src/app/components/inventario-nombre/inventario-nombre.component';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventarios',
  templateUrl: './inventarios.page.html',
  styleUrls: ['./inventarios.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonButtons,
    IonSegmentButton,
    IonSegment,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    InventarioComponenteComponent,
    InventarioNombreComponent,
 
  ],
})
export class InventariosPage implements OnInit, OnDestroy {
  activeSegment: string = 'home'; // estado del segmento
  private routerSub!: Subscription;

  private navCtrl = inject(NavController);
  private router = inject(Router);

  ngOnInit(): void {
    console.log('InventariosPage cargado');

    // nicializar activeSegment según la URL actual
    this.setActiveSegment(this.router.url);

    // Suscripción a cambios de navegación
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveSegment(event.urlAfterRedirects);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  //  Método central para determinar el segmento
  private setActiveSegment(url: string) {
    if (url.includes('ingresos')) this.activeSegment = 'ingresos';
    else if (url.includes('movimientos')) this.activeSegment = 'movimientos';
    else if (url.includes('inventarios')) this.activeSegment = 'inventarios';
    else this.activeSegment = 'home';
  }

  // Usamos navigateRoot en vez de navigateForward
  segmentChanged(event: any) {
    const { value } = event.detail;
    console.log('Segment cambiado a:', value);
    this.navCtrl.navigateRoot('/' + value);
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/home');
  }
}
