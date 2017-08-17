import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { roadParkRouting } from './road_park.routing';
import { RoadParkComponent } from './road_park.component';
import { RoadParkListComponent } from './list/road_park_list.component';
import { RoadParkListService } from './list/road_park_list.service';
import { RoadParkDetailComponent } from './detail/road_park_detail.component';
import { RoadParkDetailService } from './detail/road_park_detail.service';
import { PrimengModule } from '../../../theme/primeng/primeng.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    NgbModule,
    PrimengModule,
    roadParkRouting
  ],
  declarations: [
    RoadParkComponent,
    RoadParkListComponent,
    RoadParkDetailComponent
  ],
  providers: [
    RoadParkListService,
    RoadParkDetailService
  ]
})
export class RoadParkModule {}
