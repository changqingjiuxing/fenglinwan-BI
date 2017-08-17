import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { ModuleWithProviders } from '@angular/core';
import { OrganizationComponent } from './org/organization.component';

export const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      /*{ path: 'orgManage', loadChildren: './org/organization.module#OrganizationModule' },*/
      { path: 'orgManage', component: OrganizationComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
