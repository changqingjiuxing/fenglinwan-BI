import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './park_pages.routing';
import { NgaModule } from '../theme/nga.module';
import { DefaultModal } from './ui/default-modal/default-modal.component';

import { AppTranslationModule } from '../app.translation.module';
import { ParkPagesComponent } from './park_pages.component';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    routing
  ],
  declarations: [
    DefaultModal,
    ParkPagesComponent
  ],
  entryComponents: [
    DefaultModal
  ]
})
export class ParkPagesModule {
}
