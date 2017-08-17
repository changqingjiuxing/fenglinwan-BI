import { Routes, RouterModule } from '@angular/router';
import { RoadParkListComponent } from './list/road_park_list.component';
import { RoadParkDetailComponent } from './detail/road_park_detail.component';

const roadParkRoutes: Routes = [

  {
    path: '',
    children: [
      { path: '', component: RoadParkListComponent },
      { path: 'list', component: RoadParkListComponent },
      { path: 'detail/:id', component: RoadParkDetailComponent }
    ]
  }

];

export const roadParkRouting = RouterModule.forChild(roadParkRoutes);
