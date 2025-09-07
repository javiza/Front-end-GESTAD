import { Routes } from '@angular/router';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  {
    path: 'administrador',
    loadComponent: () => import('./pages/administrador/administrador.page').then(m => m.AdministradorPage),
    canActivate: [RoleGuard],
    data: { roles: ['administrador'] },
  },
  {
    path: 'ingresos',
    loadComponent: () => import('./pages/ingresos/ingresos.page').then(m => m.IngresosPage),
    canActivate: [RoleGuard],
    data: { roles: ['usuario'] },
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'inventarios',
    loadComponent: () => import('./pages/inventarios/inventarios.page').then( m => m.InventariosPage)
  },
  {
    path: 'unidad',
    loadComponent: () => import('./pages/unidad/unidad.page').then( m => m.UnidadPage)
  },
  {
    path: 'bajas-reparaciones',
    loadComponent: () => import('./pages/bajas-reparaciones/bajas-reparaciones.page').then( m => m.BajasReparacionesPage)
  },
  {
    path: 'lavanderia',
    loadComponent: () => import('./pages/lavanderia/lavanderia.page').then( m => m.LavanderiaPage)
  },
];
