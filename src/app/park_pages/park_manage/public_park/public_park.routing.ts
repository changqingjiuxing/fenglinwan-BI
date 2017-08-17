import { Routes, RouterModule } from '@angular/router';
import { PublicParkListComponent } from './list/public_park_list.component';
import { PublicParkDetailComponent } from './detail/public_park_detail.component';

const publicParkRoutes: Routes = [

  {
    path: '',
    children: [
      { path: '', component: PublicParkListComponent },
      { path: 'list', component: PublicParkListComponent },
      { path: 'detail/:id', component: PublicParkDetailComponent }
    ]
  }

];

export const publicParkRouting = RouterModule.forChild(publicParkRoutes);
