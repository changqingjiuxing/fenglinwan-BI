import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ButtonModule,
  InputTextModule,
  CalendarModule,
  DataTableModule,
  DialogModule,
  DropdownModule,
  InputTextareaModule,
  SharedModule,
  MultiSelectModule,
  ConfirmDialogModule,
  ConfirmationService,
  GrowlModule,
  TreeModule,
  PickListModule
} from 'primeng/primeng';

const APP_PRIMENG = [
  SharedModule,
  DataTableModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  CalendarModule,
  DropdownModule,
  InputTextareaModule,
  MultiSelectModule,
  ConfirmDialogModule,
  GrowlModule,
  TreeModule,
  PickListModule
];

const APP_DEVICE = [
];


@NgModule({
  declarations: [
    APP_DEVICE
  ],
  imports: [
    CommonModule,
    APP_PRIMENG
  ],
  exports: [
    APP_PRIMENG
  ],
  providers: [
    ConfirmationService
  ]
})

export class PrimengModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: PrimengModule,
      providers: [],
    };
  }
}
