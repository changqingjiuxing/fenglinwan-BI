import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { routing } from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { PrimengModule } from '../theme/primeng/primeng.module';

import { AppTranslationModule } from '../app.translation.module';
import { Pages } from './pages.component';


@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    NgaModule,
    PrimengModule,
    routing
  ],
  declarations: [Pages]
})
export class PagesModule {
}
