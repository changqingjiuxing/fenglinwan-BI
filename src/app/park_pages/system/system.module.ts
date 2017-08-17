import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './system.routing';

import { SystemComponent } from './system.component';
import { OraganizationModule } from './org/organization.module';


@NgModule({
  imports: [
    CommonModule,
    routing,
    OraganizationModule
  ],
  declarations: [
    SystemComponent,
  ],
})
export class SystemModule {
}
