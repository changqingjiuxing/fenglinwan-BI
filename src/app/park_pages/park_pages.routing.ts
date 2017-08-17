import { Routes, RouterModule } from '@angular/router';
import { ParkPagesComponent } from './park_pages.component';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  /*{
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },*/
  {
    path: 'park_pages',
    component: ParkPagesComponent,
    children: [

      // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
     // { path: 'park_manage', loadChildren: './park_manage/park_manage.module#ParkManageModule' },
      { path: 'road_park', loadChildren: './park_manage/road_park/road_park.module#RoadParkModule'},
      { path: 'public_park', loadChildren: './park_manage/public_park/public_park.module#PublicParkModule'},
      { path: 'appertaining_park', loadChildren: './park_manage/appertaining_park/appertaining_park.module#AppertainingParkModule'},
      { path: 'baseManage', loadChildren: './base_manage/base_manage.module#BaseManageModule' },
      { path: 'monitor', loadChildren: './monitor/monitor.module#MonitorModule' },
      { path: 'systemManage', loadChildren: './system/system.module#SystemModule' },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
