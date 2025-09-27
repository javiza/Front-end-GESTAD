import { IngresoUsuarioComponent } from 'src/app/components/ingreso-usuario/ingreso-usuario.component';
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

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
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
    IngresoUsuarioComponent
  ],
})
export class AdministradorPage implements OnInit, OnDestroy {
  activeSegment: string = 'home';
  routerSub!: Subscription;

  constructor(private navCtrl: NavController, private router: Router) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.includes('inventarios')) this.activeSegment = 'inventarios';

        else if (url.includes('administrador')) this.activeSegment = 'administrador';
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
