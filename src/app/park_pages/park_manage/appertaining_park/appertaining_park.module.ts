import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { appertainingParkRouting } from './appertaining_park.routing';
import { AppertainingParkComponent } from './appertaining_park.component';
import { AppertainingParkListComponent } from './list/appertaining_park_list.component';
import { AppertainingParkListService } from './list/appertaining_park_list.service';
import { AppertainingParkDetailComponent } from './detail/appertaining_park_detail.component';
import { AppertainingParkDetailService } from './detail/appertaining_park_detail.service';
import { PrimengModule } from '../../../theme/primeng/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    NgbModule,
    PrimengModule,
    appertainingParkRouting
  ],
  declarations: [
    AppertainingParkComponent,
    AppertainingParkListComponent,
    AppertainingParkDetailComponent

  ],
  providers: [
    AppertainingParkListService,
    AppertainingParkDetailService
  ]
})
export class AppertainingParkModule {}
