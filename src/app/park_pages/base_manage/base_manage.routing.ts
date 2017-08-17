import { Routes, RouterModule } from '@angular/router';
import { BaseManageComponent } from './base_manage.component';
import { ParkManageComponent } from './park_manage/park_manage.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: BaseManageComponent,
    children: [
      { path: 'parkManage', component: ParkManageComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
