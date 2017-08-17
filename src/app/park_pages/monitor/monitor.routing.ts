import { Routes, RouterModule } from '@angular/router';

import { Monitor } from './monitor.component';
import { SingleParkMap } from './components/singleParkMap/singleParkMap.component';
import { ParkMap } from './components/parkMap/parkMap.component';
import { TollMap } from './components/tollMap/tollMap.component';

const routes: Routes = [
  {
    path: '',
    component: Monitor,
    children: [
      { path: 'singleParkMap', component: SingleParkMap },
      { path: 'parkMap', component: ParkMap },
      { path: 'tollMap', component: TollMap },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
