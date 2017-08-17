import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrimengModule } from '../../theme/primeng/primeng.module';

import { routing } from './base_manage.routing';
import { BaseManageComponent } from './base_manage.component';
import { ParkManageComponent } from './park_manage/park_manage.component';
import { ParkManageService } from './park_manage/park_manage.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    PrimengModule,
    NgbModule,
    routing
  ],
  declarations: [
    BaseManageComponent,
    ParkManageComponent,
  ],
  providers: [
    ParkManageService,
  ]
})
export class BaseManageModule {}
