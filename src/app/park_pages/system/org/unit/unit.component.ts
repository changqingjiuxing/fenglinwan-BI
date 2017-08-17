import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'system-org-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.scss']
})
export class UnitComponent {

  @Output() delete = new EventEmitter();

  constructor() {
  }

  showDeleteDialog(param: string) {
    this.delete.emit(param);
  }
}
