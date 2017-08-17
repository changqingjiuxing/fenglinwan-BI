import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'system-org-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  @Output() changeRole = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  giveRoles(){
    this.changeRole.emit();
  }
}
