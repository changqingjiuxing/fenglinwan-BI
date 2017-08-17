import { Routes, RouterModule } from '@angular/router';
import { AppertainingParkListComponent } from './list/appertaining_park_list.component';
import { AppertainingParkDetailComponent } from './detail/appertaining_park_detail.component';

const appertainingParkRoutes: Routes = [

  {
    path: '',
    children: [
      { path: '', component: AppertainingParkListComponent },
      { path: 'list', component: AppertainingParkListComponent },
      { path: 'detail/:id', component: AppertainingParkDetailComponent }
    ]
  }

];

export const appertainingParkRouting = RouterModule.forChild(appertainingParkRoutes);
