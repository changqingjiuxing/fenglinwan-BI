import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ba-card',
  templateUrl: './baCard.html',
  styleUrls: ['./baCard.scss'],
})
export class BaCard {
  @Input() title: String;
  @Input() baCardClass: String;
  @Input() cardType: String;
  @Input() search: String;
  @Output() onCardSearch = new EventEmitter();

  cardSearch(e: any) {
    this.onCardSearch.emit(e);
  }
}
