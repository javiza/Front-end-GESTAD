
import { Component, OnInit } from '@angular/core';
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
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-bajas-reparaciones',
  templateUrl: './bajas-reparaciones.page.html',
  styleUrls: ['./bajas-reparaciones.page.scss'],
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
export class BajasReparacionesPage implements OnInit {
  activeSegment: string = 'home';

  constructor(private navCtrl: NavController) {
    // Registrar iconos una sola vez
    addIcons({ settingsOutline });
  }

  ngOnInit(): void {
    console.log('BajasReparacionesPage cargado');
  }

  ionViewWillEnter(): void {
    console.log('BajasReparacionesPage::ionViewWillEnter');
  }

  logout() {
    // Limpiar token y redirigir al login
    localStorage.removeItem('token');
    this.navCtrl.navigateRoot('/home');
  }
}
