import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DataScrollerModule, DialogModule, DataGridModule, PanelModule } from 'primeng/primeng';
import { routing } from './monitor.routing';
import { Monitor } from './monitor.component';
import { SingleParkMap } from './components/singleParkMap/singleParkMap.component';
import { ParkMap } from './components/parkMap/parkMap.component';
import { TollMap } from './components/tollMap/tollMap.component';
import { MonitorService } from './monitor.service';
import { PrimengModule } from '../../theme/primeng/primeng.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    PrimengModule,
    DataScrollerModule,
    DialogModule,
    DataGridModule,
    PanelModule,
    routing
  ],
  declarations: [
    Monitor,
    SingleParkMap,
    ParkMap,
    TollMap
  ],
  providers: [
    MonitorService
  ]
})
export class MonitorModule {
}
