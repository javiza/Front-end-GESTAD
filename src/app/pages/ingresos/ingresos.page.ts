import { Component, OnInit, OnDestroy } from '@angular/core';
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
  IonSegmentButton
} from '@ionic/angular/standalone';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.page.html',
  styleUrls: ['./ingresos.page.scss'],
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
    FormsModule
  ]
})
export class IngresosPage implements OnInit, OnDestroy {
  activeSegment: string = 'home';
  routerSub!: Subscription;

  constructor(private navCtrl: NavController, private router: Router) {}

  ngOnInit(): void {
    console.log('IngresosPage cargado');

    // cambios de navegación para mantener activo el segmento correcto
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('unidad')) this.activeSegment = 'unidad';
        else if (url.includes('lavanderia')) this.activeSegment = 'lavanderia';
        else if (url.includes('bajas-reparaciones')) this.activeSegment = 'bajas-reparaciones';
        else if (url.includes('inventarios')) this.activeSegment = 'inventarios';
        else this.activeSegment = 'home';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    console.log('Segment cambiado a:', value);
    this.navCtrl.navigateForward('/' + value);
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/home');
  }
}
