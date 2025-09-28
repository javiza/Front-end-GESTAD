import { InventarioComponenteComponent } from 'src/app/components/inventario-componente/inventario-componente.component';
import { InventarioNombreComponent } from 'src/app/components/inventario-nombre/inventario-nombre.component';
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
import { NavController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { GraficoPrendaComponent } from "src/app/components/grafico-prenda/grafico-prenda.component";

@Component({
  selector: 'app-inventarioadmin',
  templateUrl: './inventarioadmin.page.html',
  styleUrls: ['./inventarioadmin.page.scss'],
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
    GraficoPrendaComponent
],
})
export class InventarioadminPage implements OnInit, OnDestroy {
  activeSegment: string = 'home';
  routerSub!: Subscription;

  constructor(private navCtrl: NavController, private router: Router) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('administrador')) this.activeSegment = 'administrador';

        else if (url.includes('inventarioadmin')) this.activeSegment = 'inventarioadmin';
        else if (url.includes('home')) this.activeSegment = 'home';
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) this.routerSub.unsubscribe();
  }

  segmentChanged(event: any) {
    const value = event.detail.value;
    this.navCtrl.navigateForward('/' + value);
  }

  logout() {
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/home');
  }
}
