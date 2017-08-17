import { Component } from '@angular/core';

import { GlobalState } from '../../../global.state';

@Component({
  selector: 'ba-content-top',
  styleUrls: ['./baContentTop.scss'],
  templateUrl: './baContentTop.html',
})
export class BaContentTop {

  public activePageTitle: string = '';
  public activePagePath: string = '';

  constructor(private _state: GlobalState) {
    this._state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink && activeLink.route) {
        this.activePagePath = activeLink.route.paths.join('/') ;
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
