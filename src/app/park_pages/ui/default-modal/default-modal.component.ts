import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./default-modal.component.scss')],
  templateUrl: './default-modal.component.html'
})

export class DefaultModal implements OnInit {

  modalHeader: string;
  modalContent: string = `这是一个提示框.`;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {}
  confirm() {
    this.activeModal.close(true);
  }
  cancel() {
    this.activeModal.close(false);
  }
}
