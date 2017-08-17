import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { DataScrollerModule, DialogModule, DataGridModule,PanelModule } from 'primeng/primeng';
import { routing }       from './maps.routing';
import { Maps } from './maps.component';
import { BubbleMaps } from './components/bubbleMaps/bubbleMaps.component';
import { GoogleMaps } from './components/googleMaps/googleMaps.component';
import { LeafletMaps } from './components/leafletMaps/leafletMaps.component';
import { LineMaps } from './components/lineMaps/lineMaps.component';
import { Amaps } from './components/amaps/amaps.component';
import { BubbleMapsService } from './components/bubbleMaps/bubbleMaps.service';
import { LineMapsService } from './components/lineMaps/lineMaps.service';
import { AmapsService } from './components/amaps/amaps.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    DataScrollerModule,
    DialogModule,
    DataGridModule,
    PanelModule,
    routing
  ],
  declarations: [
    Maps,
    BubbleMaps,
    GoogleMaps,
    LeafletMaps,
    LineMaps,
    Amaps
  ],
  providers: [
    BubbleMapsService,
    LineMapsService,
    AmapsService
  ]
})
export class MapsModule {
}
