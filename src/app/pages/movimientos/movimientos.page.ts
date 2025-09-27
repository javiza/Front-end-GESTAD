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
  IonSegmentButton,
} from '@ionic/angular/standalone';

import { MovimientosComponenteComponent } from 'src/app/components/movimientos-componente/movimientos-componente.component';
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mov',
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
  activeSegment: string = 'home';
  routerSub!: Subscription;

  constructor(private navCtrl: NavController, private router: Router) {}

  ngOnInit(): void {
    console.log('MovimientosPage cargado');

    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

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
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }

  segmentChanged(event: any) {
    const {value} = event.detail;
    console.log('Segment cambiado a:', value);
    this.navCtrl.navigateForward('/' + value);
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/home');
  }
}
