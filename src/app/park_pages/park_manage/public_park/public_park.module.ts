import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { publicParkRouting } from './public_park.routing';
import { PublicParkComponent } from './public_park.component';
import { PublicParkListComponent } from './list/public_park_list.component';
import { PublicParkListService } from './list/public_park_list.service';
import { PublicParkDetailComponent } from './detail/public_park_detail.component';
import { PublicParkDetailService } from './detail/public_park_detail.service';
import { PrimengModule } from '../../../theme/primeng/primeng.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    NgbModule,
    PrimengModule,
    publicParkRouting
  ],
  declarations: [
    PublicParkComponent,
    PublicParkListComponent,
    PublicParkDetailComponent

  ],

  providers: [
    PublicParkListService,
    PublicParkDetailService
  ]
})
export class PublicParkModule {}
