import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimengModule } from '../../../theme/primeng/primeng.module';
import { NgaModule } from '../../../theme/nga.module';

import { OrganizationComponent } from './organization.component';
import { UnitComponent } from './unit/unit.component';
import { DepartmentComponent } from './department/department.component';
import { PositionComponent } from './position/position.component';
import { PersonComponent } from './person/person.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrimengModule,
    NgaModule
  ],
  declarations: [
    OrganizationComponent,
    UnitComponent,
    DepartmentComponent,
    PositionComponent,
    PersonComponent
  ]
})
export class OraganizationModule {
}
