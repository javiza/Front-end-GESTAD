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
import { MovimientosComponenteComponent } from 'src/app/components/movimientos-componente/movimientos-componente.component';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.page.html',
  styleUrls: ['./movimientos.page.scss'],
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
    MovimientosComponenteComponent
  ],
})
export class MovimientosPage implements OnInit, OnDestroy {
  activeSegment: string = 'home'; // estado del segmento
  private routerSub!: Subscription;

  private navCtrl = inject(NavController);
  private router = inject(Router);

  ngOnInit(): void {
    console.log('movimientosPage cargado');

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
    if (url.includes('ingresos')) {
      this.activeSegment = 'ingresos';
    } else if (url.includes('inventarios')) {
             this.activeSegment = 'inventarios';
           } else if (url.includes('movimientos')) {
                    this.activeSegment = 'movimientos';
                  } else {
                    this.activeSegment = 'home';
                  }
  }

  // Usamos navigateRoot 
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
